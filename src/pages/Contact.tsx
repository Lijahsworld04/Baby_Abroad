import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Clock, Globe } from "lucide-react";

/* ------------------------------------------------------------------
 * EmailJS configuration
 * ------------------------------------------------------------------
 * To make the form actually send to contact@gobabyabroad.com, create a
 * free EmailJS account (https://www.emailjs.com), add an Email Service
 * pointing at that Gmail address, and create an Email Template with the
 * variables used below (name, email, preferred_time, timezone, message).
 *
 * The EmailJS account, email service, and template are configured on the
 * EmailJS dashboard (https://www.emailjs.com). The template uses the
 * variables: name, email, preferred_time, timezone, message.
 * ------------------------------------------------------------------ */
const EMAILJS_CONFIG = {
  serviceId: "Baby_Abroad",
  templateId: "template_dy2c49n",
  publicKey: "yG8JhT0Ib6ofQYcK3",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    setIsSending(true);
    setError(false);

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          preferred_time: String(data.get("preferred_time") ?? ""),
          timezone: String(data.get("timezone") ?? ""),
          message: String(data.get("message") ?? ""),
          to_email: "contact@gobabyabroad.com",
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Layout path="/contact">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Let's Talk About Your Move
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              A supportive conversation about your next chapter, with no pressure. Tell us your
              plans and we'll put together a tailored package for you.
            </p>
          </div>

          {submitted ? (
            <Card className="mt-10">
              <CardContent>
                <p className="text-center">
                  Thanks for reaching out — your message has been sent. We'll get back to you at{" "}
                  <span className="font-medium">contact@gobabyabroad.com</span> shortly.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-10">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="preferred_time" className="flex items-center gap-2">
                      <Clock className="size-4 text-primary" aria-hidden="true" />
                      Preferred time
                    </Label>
                    <Input
                      id="preferred_time"
                      name="preferred_time"
                      placeholder="e.g. Tuesday 2pm"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="timezone" className="flex items-center gap-2">
                      <Globe className="size-4 text-primary" aria-hidden="true" />
                      Your time zone
                    </Label>
                    <Input id="timezone" name="timezone" placeholder="e.g. EST, PST, GMT" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your move plans..."
                      rows={5}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">
                      Sorry — we couldn't send your message right now. Please try again, or email
                      us directly at contact@gobabyabroad.com.
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={isSending}>
                    <Send data-icon="inline-start" />
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    We use your details only to reply to you and schedule your consultation. By
                    sending this message you agree to our{" "}
                    <Link to="/privacy" className="text-primary underline underline-offset-4">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms" className="text-primary underline underline-offset-4">
                      Terms
                    </Link>
                    . Please don't include passport, bank or other sensitive numbers.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Prefer Direct Contact?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              You can also reach us by email at contact@gobabyabroad.com or on WhatsApp
              at +1 815 616 9684.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}