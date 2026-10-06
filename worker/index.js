// Baby Abroad: the small piece of Cloudflare code that talks to Stripe.
// It only handles addresses starting with /api/ (see wrangler.jsonc). Everything else is the
// normal website, served as before.
//
// Secrets (set in Cloudflare, never in this repo):
//   STRIPE_SECRET_KEY        your Stripe secret key (sk_test_... first, later sk_live_...)
//   STRIPE_PUBLISHABLE_KEY   your Stripe publishable key (pk_test_... / pk_live_...)
// Optional: STRIPE_API_VERSION  only if Stripe's default API version rejects the request.

import { PRODUCTS, getProduct } from "../src/content/catalog.js";

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
    lines.push({ product, qty: it.qty });
  }
  return lines;
}

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

  const form = new URLSearchParams();
  form.set("ui_mode", "embedded_page");
  form.set("mode", "payment");
  form.set("return_url", `${url.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`);
  lines.forEach(({ product, qty }, i) => {
    form.set(`line_items[${i}][quantity]`, String(qty));
    form.set(`line_items[${i}][price_data][currency]`, "usd");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(product.amount));
    form.set(`line_items[${i}][price_data][product_data][name]`, product.name);
    form.set(`line_items[${i}][price_data][product_data][description]`, product.description);
  });
  form.set("metadata[items]", lines.map((l) => `${l.product.id} x${l.qty}`).join(", "));
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

    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PUBLISHABLE_KEY) {
      return json({ error: "Checkout isn't switched on yet." }, 503);
    }
    try {
      if (url.pathname === "/api/config" && request.method === "GET") {
        return json({ publishableKey: env.STRIPE_PUBLISHABLE_KEY });
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
