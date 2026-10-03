import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, PhoneCall } from "lucide-react";
import { FAQS } from "@/content/faq.js";

export default function Faq() {
  return (
    <Layout path="/faq">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Moving Abroad: Frequently Asked Questions
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Straight answers about costs, timelines, visas and how Baby Abroad works.
            </p>
          </div>

          <div className="mt-12 grid gap-4">
            {FAQS.map((f) => (
              <Card key={f.q} className="py-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-heading text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    <h2 className="text-lg font-semibold">{f.q}</h2>
                    <ChevronDown
                      className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <CardContent className="pb-6">
                    <p className="text-muted-foreground">{f.a}</p>
                  </CardContent>
                </details>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-center text-muted-foreground">
            Want to go deeper? Browse our{" "}
            <Link to="/guides" className="text-primary underline underline-offset-4">
              moving abroad guides
            </Link>{" "}
            or see our{" "}
            <Link to="/services" className="text-primary underline underline-offset-4">
              services and pricing
            </Link>
            .
          </p>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Still Have a Question?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Tell us where you are in your planning and we will help you find the right starting point.
            </p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="lg" className="bg-gold text-[#1B1203] hover:bg-gold/85">
                <PhoneCall data-icon="inline-start" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
