import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SCREENS, scoreCountries, PAID_REPORTS_OPEN } from "@/content/quiz";

type Answers = Record<string, any>;
type Stage = "intro" | "quiz" | "contact" | "result";

const STORE = "ba-quiz-answers";
const PREVIEW = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("preview");

function loadSaved(): Answers {
  try {
    const raw = sessionStorage.getItem(STORE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function visible(part: any, a: Answers) {
  if (!part.showIf) return true;
  const v = a[part.showIf.key];
  return Array.isArray(v) ? v.includes(part.showIf.includes) : v === part.showIf.includes;
}

function partDone(part: any, a: Answers) {
  if (!visible(part, a) || part.optional) return true;
  const v = a[part.key];
  if (Array.isArray(v)) return v.length > 0;
  return typeof v === "string" && v.trim() !== "";
}

const optionClass = (on: boolean) =>
  "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  (on
    ? "border-primary bg-primary text-primary-foreground"
    : "border-border bg-card hover:border-primary/60");

export default function Quiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(loadSaved);
  const [contact, setContact] = useState({ name: "", email: "", email2: "", ack: false, marketing: false, website: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [quizId, setQuizId] = useState("");
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(answers));
    } catch {
      /* fine without it */
    }
  }, [answers]);

  const screen = SCREENS[step];
  const set = (k: string, v: any) => setAnswers((a) => ({ ...a, [k]: v }));

  function toggle(part: any, value: string, exclusive?: boolean) {
    const cur: string[] = answers[part.key] || [];
    let next: string[];
    if (cur.includes(value)) next = cur.filter((x) => x !== value);
    else if (exclusive) next = [value];
    else {
      const ex = (part.options || []).filter((o: any) => o.exclusive).map((o: any) => o.v);
      next = cur.filter((x) => !ex.includes(x));
      if (part.max && next.length >= part.max) return;
      next = [...next, value];
    }
    set(part.key, next);
  }

  const result = useMemo(() => (stage === "result" ? scoreCountries(answers) : []), [stage, answers]);
  const canNext = screen ? screen.parts.every((p: any) => partDone(p, answers)) : false;

  function next() {
    if (step < SCREENS.length - 1) setStep(step + 1);
    else setStage("contact");
    window.scrollTo({ top: 0 });
  }
  function back() {
    if (stage === "contact") setStage("quiz");
    else if (step > 0) setStep(step - 1);
    else setStage("intro");
    window.scrollTo({ top: 0 });
  }

  function buy(id: "quiz-snapshot" | "quiz-brief") {
    cart.remove("quiz-snapshot");
    cart.remove("quiz-brief");
    cart.add(id);
    navigate("/checkout");
  }
  const canBuy = PAID_REPORTS_OPEN && !!quizId;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const email = contact.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    if (email.toLowerCase() !== contact.email2.trim().toLowerCase()) return setError("The two email addresses don't match.");
    if (!contact.name.trim()) return setError("Please add your first name.");
    if (!contact.ack) return setError("Please tick the box to confirm you've read the note about results and the consultation credit.");
    setSending(true);
    try {
      if (PREVIEW) {
        setQuizId("");
      } else {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contact.name.trim(),
            email,
            marketingConsent: contact.marketing,
            acknowledged: contact.ack,
            website: contact.website,
            answers,
            topMatch: scoreCountries(answers)[0]?.slug ?? null,
            ranking: scoreCountries(answers).slice(0, 8).map((r: any) => ({ slug: r.slug, name: r.name, score: Math.round(r.score), reasons: r.reasons })),
          }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "Something went wrong.");
        }
        const ok = await res.json().catch(() => ({}));
        if (typeof ok.quizId === "string") {
          setQuizId(ok.quizId);
          try {
            sessionStorage.setItem("ba-quiz-id", ok.quizId);
          } catch {
            /* ignore */
          }
        }
      }
      try {
        sessionStorage.removeItem(STORE);
      } catch {
        /* ignore */
      }
      setStage("result");
      window.scrollTo({ top: 0 });
    } catch (err: any) {
      setError(err?.message || "We couldn't save that. Please try again, or email contact@gobabyabroad.com.");
    } finally {
      setSending(false);
    }
  }

  const pct = stage === "intro" ? 0 : stage === "quiz" ? Math.round((step / (SCREENS.length + 1)) * 100) : stage === "contact" ? Math.round((SCREENS.length / (SCREENS.length + 1)) * 100) : 100;

  const Disclaimer = (
    <div className="rounded-2xl border-2 border-primary bg-card p-5 text-sm leading-relaxed">
      <p className="font-semibold">Please read this before you start</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>The quiz is free. Your <strong>full results are a paid report</strong> ($20 or $40), sent to your email as a PDF.</li>
        <li>The report is general guidance, not legal or immigration advice. Visa rules change, so always confirm with the official government source.</li>
        <li>A <strong>personalized plan is done on a one-on-one video consultation ($75)</strong>, not through this quiz.</li>
        <li>Whatever you pay for a report is <strong>credited toward that $75 video consultation</strong> if you book within 30 days. The credit works once and has no cash value.</li>
        <li>If you don't buy a report, we may email you about your results and your move. You can unsubscribe at any time.</li>
      </ul>
    </div>
  );

  return (
    <Layout path="/quiz">
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {stage !== "intro" && (
            <div className="mb-6" aria-label="Progress">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          {stage === "intro" && (
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Find Your Best-Fit Country</h1>
              <Ornament />
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                About 10 minutes. Answer a few questions about your life, budget and priorities, and we'll show your top match from 30 popular relocation countries.
              </p>
              <div className="mt-8 text-left">{Disclaimer}</div>
              <Button size="lg" className="mt-8" onClick={() => setStage("quiz")}>Start the quiz</Button>
              <p className="mt-4 text-xs text-muted-foreground">
                We use your answers to prepare your results. See our <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          )}

          {stage === "quiz" && screen && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{screen.section} · {step + 1} of {SCREENS.length}</p>
              <h2 className="mt-2 text-2xl font-bold text-balance md:text-3xl">{screen.title}</h2>
              {screen.help && <p className="mt-2 text-sm text-muted-foreground">{screen.help}</p>}
              <div className="mt-6 space-y-8">
                {screen.parts.filter((p: any) => visible(p, answers)).map((part: any) => (
                  <div key={part.key}>
                    {part.label && <Label className="mb-3 block text-base font-semibold">{part.label}</Label>}
                    {part.type === "single" && (
                      <div role="radiogroup" className="grid gap-2">
                        {part.options.map((o: any) => (
                          <button key={o.v} type="button" role="radio" aria-checked={answers[part.key] === o.v}
                            className={optionClass(answers[part.key] === o.v)} onClick={() => set(part.key, o.v)}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {part.type === "multi" && (
                      <div className="grid gap-2">
                        {part.max && <p className="text-xs text-muted-foreground">Choose up to {part.max}.</p>}
                        {part.options.map((o: any) => {
                          const on = (answers[part.key] || []).includes(o.v);
                          return (
                            <button key={o.v} type="button" aria-pressed={on} className={optionClass(on)}
                              onClick={() => toggle(part, o.v, o.exclusive)}>
                              {o.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {part.type === "select" && (
                      <select
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"
                        value={answers[part.key] || ""}
                        onChange={(e) => set(part.key, e.target.value)}
                      >
                        <option value="">Choose one…</option>
                        {part.options.map((o: any) => <option key={o.v} value={o.v}>{o.label}</option>)}
                      </select>
                    )}
                    {part.type === "text" && (
                      <Input value={answers[part.key] || ""} maxLength={200} placeholder={part.placeholder}
                        onChange={(e) => set(part.key, e.target.value)} />
                    )}
                    {part.type === "longtext" && (
                      <Textarea rows={4} value={answers[part.key] || ""} maxLength={1500} placeholder={part.placeholder}
                        onChange={(e) => set(part.key, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <Button variant="outline" onClick={back}>Back</Button>
                <Button onClick={next} disabled={!canNext}>{step === SCREENS.length - 1 ? "Almost done" : "Next"}</Button>
              </div>
            </div>
          )}

          {stage === "contact" && (
            <form onSubmit={submit}>
              <h2 className="text-2xl font-bold text-balance md:text-3xl">Where should we send your results?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your full results are emailed to you. We'll also show your top match on the next screen.</p>
              <div className="mt-6 space-y-4">
                <div><Label htmlFor="q-name">First name</Label>
                  <Input id="q-name" autoComplete="given-name" value={contact.name} maxLength={80} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></div>
                <div><Label htmlFor="q-email">Email</Label>
                  <Input id="q-email" type="email" autoComplete="email" value={contact.email} maxLength={200} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
                <div><Label htmlFor="q-email2">Confirm email</Label>
                  <Input id="q-email2" type="email" autoComplete="off" value={contact.email2} maxLength={200} onChange={(e) => setContact({ ...contact, email2: e.target.value })} /></div>
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} /></label>
                </div>
                {Disclaimer}
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]" checked={contact.ack} onChange={(e) => setContact({ ...contact, ack: e.target.checked })} />
                  <span>I understand the full results are a paid report, and that what I pay is credited once toward a $75 video consultation booked within 30 days. (Required)</span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]" checked={contact.marketing} onChange={(e) => setContact({ ...contact, marketing: e.target.checked })} />
                  <span>Yes, send me occasional relocation tips and offers from Baby Abroad. I can unsubscribe at any time. (Optional)</span>
                </label>
                {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <Button type="button" variant="outline" onClick={back}>Back</Button>
                <Button type="submit" disabled={sending}>{sending ? "Saving…" : "See my top match"}</Button>
              </div>
            </form>
          )}

          {stage === "result" && (
            <div>
              <h2 className="text-3xl font-bold text-balance">Your top match{contact.name ? `, ${contact.name.trim()}` : ""}</h2>
              {result[0] && (
                <Card className="mt-6 border-primary">
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Best fit for your answers</p>
                    <p className="mt-1 text-3xl font-bold">{result[0].name}</p>
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
                      {result[0].reasons.map((r: string) => <li key={r}>{r}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}
              <p className="mt-6 text-sm text-muted-foreground">
                This is a starting point only. Your full ranked results, visa options and next steps are in the paid report, which we'll email to you.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card><CardContent className="p-5">
                  <p className="font-bold">Match + Visa Snapshot</p><p className="text-2xl font-bold">$20</p>
                  <p className="mt-2 text-sm text-muted-foreground">Your ranked matches, why each fits, and the likely visa route for your passport.</p>
                  <Button className="mt-4 w-full" disabled={!canBuy} onClick={() => buy("quiz-snapshot")}>{canBuy ? "Get the Snapshot" : "Opening soon"}</Button>
                </CardContent></Card>
                <Card><CardContent className="p-5">
                  <p className="font-bold">Full Relocation Brief</p><p className="text-2xl font-bold">$40</p>
                  <p className="mt-2 text-sm text-muted-foreground">Everything in the Snapshot, plus costs, cities, healthcare, a first-90-days plan and your next steps.</p>
                  <Button className="mt-4 w-full" disabled={!canBuy} onClick={() => buy("quiz-brief")}>{canBuy ? "Get the Full Brief" : "Opening soon"}</Button>
                </CardContent></Card>
              </div>
              <div className="mt-6">{Disclaimer}</div>
              <p className="mt-6 text-center text-sm">Want to talk it through now? <Link to="/services" className="underline">See the $75 video consultation</Link>.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
