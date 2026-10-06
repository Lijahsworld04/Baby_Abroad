import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Minus, Plus, Trash2, Lock, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/content/catalog.js";

// Stripe's own script must be loaded from js.stripe.com (Stripe requires this; it is never bundled).
const STRIPE_JS = "https://js.stripe.com/endive/stripe.js";

interface EmbeddedCheckout {
  mount: (el: HTMLElement) => void;
  destroy: () => void;
}
interface StripeInstance {
  createEmbeddedCheckoutPage: (opts: { fetchClientSecret: () => Promise<string> }) => Promise<EmbeddedCheckout>;
}
type StripeFactory = (publishableKey: string) => StripeInstance;

function loadStripeJs(): Promise<StripeFactory> {
  const w = window as unknown as { Stripe?: StripeFactory };
  if (w.Stripe) return Promise.resolve(w.Stripe);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = STRIPE_JS;
    s.async = true;
    s.onload = () => (w.Stripe ? resolve(w.Stripe) : reject(new Error("Stripe did not start.")));
    s.onerror = () => reject(new Error("Could not load the secure payment form."));
    document.head.appendChild(s);
  });
}

const TOP_META = {
  path: "/checkout",
  title: "Checkout | Baby Abroad",
  description: "Secure checkout for Baby Abroad workbooks, consultations and written relocation plans.",
  noindex: true,
};

function PaymentForm({ items }: { items: { id: string; qty: number }[] }) {
  const holder = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let checkout: EmbeddedCheckout | null = null;
    (async () => {
      try {
        const cfg = await fetch("/api/config").then((r) => (r.ok ? r.json() : Promise.reject(new Error("off"))));
        const Stripe = await loadStripeJs();
        const stripe = Stripe(cfg.publishableKey);
        const instance = await stripe.createEmbeddedCheckoutPage({
          fetchClientSecret: async () => {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.clientSecret) throw new Error(data.error || "Checkout could not start.");
            return data.clientSecret as string;
          },
        });
        if (cancelled || !holder.current) {
          instance.destroy();
          return;
        }
        checkout = instance;
        instance.mount(holder.current);
        setLoading(false);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error && e.message !== "off" ? e.message : "Checkout isn't available right now.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
      checkout?.destroy();
    };
    // The form is rebuilt from scratch whenever the cart is edited (see the Edit cart button).
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading && <p className="py-8 text-center text-muted-foreground">Loading secure payment form…</p>}
      {error && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          {error} If it keeps happening, email us at{" "}
          <a className="underline" href="mailto:contact@gobabyabroad.com">
            contact@gobabyabroad.com
          </a>
          .
        </p>
      )}
      <div ref={holder} />
    </div>
  );
}

export default function Checkout() {
  const { lines, total, setQty, remove } = useCart();
  const [paying, setPaying] = useState(false);

  const detailed = lines.flatMap((l) => {
    const p = getProduct(l.id);
    return p ? [{ ...l, product: p }] : [];
  });

  return (
    <Layout page={TOP_META}>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Checkout</h1>
            <Ornament className="mt-4" />
          </div>

          {detailed.length === 0 ? (
            <Card className="mt-10">
              <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                <ShoppingBag className="size-10 text-primary" aria-hidden="true" />
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Link to="/services">
                  <Button size="lg">See services &amp; pricing</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mt-10">
                <CardContent className="flex flex-col gap-4 py-2">
                  {detailed.map(({ product, qty }) => (
                    <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 pb-4 last:border-b-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(product.amount)} each</p>
                      </div>
                      {!paying && (
                        <div className="flex items-center gap-1">
                          {product.maxQty > 1 && (
                            <>
                              <Button variant="outline" size="icon-sm" aria-label={`Fewer ${product.name}`} onClick={() => setQty(product.id, qty - 1)}>
                                <Minus />
                              </Button>
                              <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{qty}</span>
                              <Button variant="outline" size="icon-sm" aria-label={`More ${product.name}`} disabled={qty >= product.maxQty} onClick={() => setQty(product.id, qty + 1)}>
                                <Plus />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="icon-sm" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)}>
                            <Trash2 />
                          </Button>
                        </div>
                      )}
                      {paying && product.maxQty > 1 && <span className="text-sm text-muted-foreground">× {qty}</span>}
                      <p className="w-20 text-right font-semibold tabular-nums">{formatPrice(product.amount * qty)}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-primary/25 pt-4 text-lg font-bold">
                    <span>Total (USD)</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                </CardContent>
              </Card>

              {!paying ? (
                <div className="mt-6 text-center">
                  <Button size="lg" onClick={() => setPaying(true)}>
                    <Lock data-icon="inline-start" />
                    Continue to payment
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground">
                    All sales are final (see our <Link className="underline" to="/terms">Terms</Link>). Consultations and plans are scheduled and delivered by email.
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <PaymentForm items={lines.map((l) => ({ id: l.id, qty: l.qty }))} />
                  <div className="mt-4 text-center">
                    <Button variant="ghost" onClick={() => setPaying(false)}>
                      Edit cart
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export function CheckoutReturn() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const { clear } = useCart();
  const [state, setState] = useState<{ phase: "loading" | "paid" | "open" | "error"; email?: string | null }>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("status"))))
      .then((d) => {
        if (cancelled) return;
        if (d.status === "complete") {
          clear();
          setState({ phase: "paid", email: d.email });
        } else setState({ phase: "open" });
      })
      .catch(() => !cancelled && setState({ phase: "error" }));
    return () => {
      cancelled = true;
    };
  }, [sessionId, clear]);

  return (
    <Layout
      page={{
        path: "/checkout/return",
        title: "Order Confirmation | Baby Abroad",
        description: "Your Baby Abroad order.",
        noindex: true,
      }}
    >
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          {state.phase === "loading" && <p className="text-muted-foreground">Checking your order…</p>}
          {state.phase === "paid" && (
            <>
              <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance">Thank you, love!</h1>
              <Ornament className="mt-4" />
              <p className="mt-4 text-muted-foreground">
                Your payment went through{state.email ? <> and a receipt is on its way to <strong>{state.email}</strong></> : null}. We'll
                email you next about your order, and to schedule your consultation if you booked one.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Questions? Write to{" "}
                <a className="underline" href="mailto:contact@gobabyabroad.com">contact@gobabyabroad.com</a>.
              </p>
              <Link to="/" className="mt-6 inline-block">
                <Button size="lg">Back to home</Button>
              </Link>
            </>
          )}
          {state.phase === "open" && (
            <>
              <h1 className="text-3xl font-bold tracking-tight">Your payment wasn't completed</h1>
              <p className="mt-3 text-muted-foreground">No charge was made. Your cart is still saved, so you can try again.</p>
              <Link to="/checkout" className="mt-6 inline-block">
                <Button size="lg">Back to checkout</Button>
              </Link>
            </>
          )}
          {state.phase === "error" && (
            <>
              <h1 className="text-3xl font-bold tracking-tight">We couldn't check your order</h1>
              <p className="mt-3 text-muted-foreground">
                If you were charged, Stripe has emailed you a receipt. Otherwise write to{" "}
                <a className="underline" href="mailto:contact@gobabyabroad.com">contact@gobabyabroad.com</a> and we'll sort it out.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
