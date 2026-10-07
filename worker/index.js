// Baby Abroad: the small piece of Cloudflare code that talks to Stripe.
// It only handles addresses starting with /api/ (see wrangler.jsonc). Everything else is the
// normal website, served as before.
//
// Secrets (set in Cloudflare, never in this repo):
//   STRIPE_SECRET_KEY        your Stripe secret key (sk_test_... first, later sk_live_...)
//   STRIPE_PUBLISHABLE_KEY   your Stripe publishable key (pk_test_... / pk_live_...)
//   N8N_AVAILABILITY_URL     the n8n webhook that returns your busy times (call booking)
//   N8N_AVAILABILITY_TOKEN   a secret password shared with that n8n webhook (header x-ba-token)
// Optional: STRIPE_API_VERSION  only if Stripe's default API version rejects the request.

import { PRODUCTS, getProduct } from "../src/content/catalog.js";
import { SCHEDULE, allSlotStarts, freeSlots } from "../src/content/schedule.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

function stripeHeaders(env) {
  const h = {
    Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (env.STRIPE_API_VERSION) h["Stripe-Version"] = env.STRIPE_API_VERSION;
  return h;
}

/** Turn the cart sent by the browser into clean, server-priced lines (or null if anything looks wrong). */
function cleanCart(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > PRODUCTS.length) return null;
  const seen = new Set();
  const lines = [];
  for (const it of items) {
    const product = it && typeof it.id === "string" ? getProduct(it.id) : undefined;
    if (!product || seen.has(product.id)) return null;
    if (!Number.isInteger(it.qty) || it.qty < 1 || it.qty > product.maxQty) return null;
    seen.add(product.id);
    const line = { product, qty: it.qty };
    if (product.booking) {
      if (typeof it.slot !== "string") return null;
      line.slot = it.slot;
    }
    lines.push(line);
  }
  return lines;
}

/** Ask n8n (which can see your Google Calendar) which times are already busy. */
async function getBusy(env, fromIso, toIso) {
  if (!env.N8N_AVAILABILITY_URL || !env.N8N_AVAILABILITY_TOKEN) throw new Error("scheduling-off");
  const res = await fetch(env.N8N_AVAILABILITY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-ba-token": env.N8N_AVAILABILITY_TOKEN },
    body: JSON.stringify({ timeMin: fromIso, timeMax: toIso }),
    signal: AbortSignal.timeout(9000),
  });
  if (!res.ok) throw new Error("scheduling-down");
  const data = await res.json().catch(() => ({}));
  return Array.isArray(data.busy) ? data.busy : [];
}

const DAY = 86400000;
async function openSlots(env) {
  const starts = allSlotStarts();
  if (!starts.length) return [];
  const busy = await getBusy(env, new Date(Date.parse(starts[0]) - DAY).toISOString(), new Date(Date.parse(starts[starts.length - 1]) + DAY).toISOString());
  return freeSlots(starts, busy);
}

async function availability(env) {
  try {
    return json({ zone: SCHEDULE.zone, durationMinutes: SCHEDULE.durationMinutes, slots: await openSlots(env) });
  } catch (err) {
    const off = err && err.message === "scheduling-off";
    console.error("Availability failed:", err && err.message);
    return json({ error: off ? "Call booking isn't switched on yet." : "Scheduling is temporarily unavailable. Please try again, or email us." }, 503);
  }
}

const validZone = (z) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: z });
    return typeof z === "string" && z.length <= 60;
  } catch {
    return false;
  }
};

async function createSession(request, env, url) {
  // Only our own website may ask for a checkout session.
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return json({ error: "Not allowed." }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  const lines = cleanCart(body && body.items);
  if (!lines) return json({ error: "Your cart looks wrong. Please refresh and try again." }, 400);

  // Call bookings: each chosen time must be a real, still-open slot.
  const booked = lines.filter((l) => l.slot);
  const tz = validZone(body.timeZone) ? body.timeZone : "UTC";
  if (booked.length) {
    if (new Set(booked.map((l) => l.slot)).size !== booked.length) return json({ error: "Please pick a different time for each call." }, 400);
    let open;
    try {
      open = new Set(await openSlots(env));
    } catch (err) {
      console.error("Slot check failed:", err && err.message);
      return json({ error: "Scheduling is temporarily unavailable. Please try again, or email us." }, 503);
    }
    if (booked.some((l) => !open.has(new Date(l.slot).toISOString()))) {
      return json({ error: "Sorry, that time was just taken or is no longer available. Please pick another time." }, 409);
    }
  }

  const form = new URLSearchParams();
  form.set("ui_mode", "embedded_page");
  form.set("mode", "payment");
  form.set("return_url", `${url.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`);
  lines.forEach(({ product, qty, slot }, i) => {
    form.set(`line_items[${i}][quantity]`, String(qty));
    form.set(`line_items[${i}][price_data][currency]`, "usd");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(product.amount));
    form.set(`line_items[${i}][price_data][product_data][name]`, product.name);
    let desc = product.description;
    if (slot) {
      const when = new Intl.DateTimeFormat("en-US", { timeZone: tz, dateStyle: "full", timeStyle: "short" }).format(new Date(slot));
      desc = `Your call: ${when} (${tz}). ${desc}`;
    }
    form.set(`line_items[${i}][price_data][product_data][description]`, desc.slice(0, 900));
  });
  form.set("metadata[items]", lines.map((l) => `${l.product.id} x${l.qty}`).join(", "));
  if (booked.length) {
    form.set("metadata[bookings]", booked.map((l) => `${l.product.id}@${new Date(l.slot).toISOString()}`).join(";"));
    form.set("metadata[customer_tz]", tz);
  }
  form.set("payment_intent_data[description]", `Baby Abroad: ${lines.map((l) => l.product.name).join(", ")}`.slice(0, 900));

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: stripeHeaders(env),
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.client_secret) {
    // Log the real reason for you (Cloudflare logs); show visitors something friendly.
    console.error("Stripe create session failed:", res.status, data && data.error && data.error.message);
    return json({ error: "We couldn't start checkout. Please try again, or email us." }, 502);
  }
  return json({ clientSecret: data.client_secret });
}

async function sessionStatus(env, url) {
  const id = url.searchParams.get("session_id") || "";
  if (!SESSION_ID.test(id)) return json({ error: "Bad request." }, 400);
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}`, { headers: stripeHeaders(env) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return json({ error: "Order not found." }, 404);
  return json({
    status: data.status,
    paymentStatus: data.payment_status,
    email: data.customer_details && data.customer_details.email ? data.customer_details.email : null,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    if (url.pathname === "/api/availability" && request.method === "GET") return await availability(env);
    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PUBLISHABLE_KEY) {
      return json({ error: "Checkout isn't switched on yet." }, 503);
    }
    try {
      if (url.pathname === "/api/config" && request.method === "GET") {
        return json({ publishableKey: env.STRIPE_PUBLISHABLE_KEY });
      }
      if (url.pathname === "/api/availability" && request.method === "GET") {
        return await availability(env);
      }
      if (url.pathname === "/api/checkout" && request.method === "POST") {
        return await createSession(request, env, url);
      }
      if (url.pathname === "/api/session-status" && request.method === "GET") {
        return await sessionStatus(env, url);
      }
    } catch (err) {
      console.error("Checkout error:", err && err.message);
      return json({ error: "Something went wrong. Please try again." }, 500);
    }
    return json({ error: "Not found." }, 404);
  },
};
