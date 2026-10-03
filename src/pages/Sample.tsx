import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SAMPLE } from "@/content/sample.js";

interface Section {
  h2: string;
  paragraphs?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  after?: string[];
}

export default function Sample() {
  return (
    <Layout path="/sample-plan">
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sample Plan" }]} />
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance md:text-5xl">
              {SAMPLE.h1}
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-sm text-muted-foreground">
              Sample plan excerpt · client details removed
            </p>
          </header>

          <p className="mt-10 text-lg leading-relaxed">{SAMPLE.intro}</p>
          <p className="mt-4 rounded-2xl border border-gold/30 bg-card p-5 text-center font-heading text-lg backdrop-blur-md">
            {SAMPLE.note}
          </p>

          {(SAMPLE.sections as Section[]).map((s) => (
            <section key={s.h2} className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">{s.h2}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed">
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.table && (
                  <div className="overflow-x-auto rounded-2xl border border-primary/25 bg-card backdrop-blur-md">
                    <table className="w-full text-left text-base">
                      <thead>
                        <tr className="bg-muted/60">
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-heading font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r[0]} className="border-t border-primary/15">
                            {r.map((c, i) =>
                              i === 0 ? (
                                <th key={c} scope="row" className="px-4 py-3 font-semibold">
                                  {c}
                                </th>
                              ) : (
                                <td key={c} className="px-4 py-3 text-muted-foreground">
                                  {c}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.list && (
                  <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Ready to Make Your Next Destination Yours?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {SAMPLE.note} Full plans are provided to consulting clients only.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact">
                <Button size="lg" className="bg-gold text-[#1B1203] hover:bg-gold/85">
                  <PhoneCall data-icon="inline-start" />
                  Book a Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
                >
                  See Services &amp; Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
