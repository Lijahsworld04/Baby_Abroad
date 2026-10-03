import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, PhoneCall } from "lucide-react";
import { DISCLAIMER, getGuide } from "@/content/guides.js";
import { guidePage } from "@/seo/pages.js";
import NotFound from "@/pages/NotFound";

export default function Guide() {
  const { slug = "" } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;

  const page = guidePage(guide);
  const related = guide.related.map((s: string) => getGuide(s)).filter(Boolean);

  return (
    <Layout page={page}>
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Guides", href: "/guides" },
                { name: guide.h1 },
              ]}
            />
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance md:text-5xl">
              {guide.h1}
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              {guide.readMinutes} min read · By Aalijah Herron · Updated{" "}
              <time dateTime={guide.dateModified}>
                {new Date(guide.dateModified + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </header>

          <div className="mt-10 space-y-4 text-lg leading-relaxed">
            {guide.intro.map((p: string) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {guide.sections.map(
            (s: { h2: string; paragraphs?: string[]; list?: string[]; ordered?: boolean; after?: string[] }) => (
              <section key={s.h2} className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">{s.h2}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed">
                  {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
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
            ),
          )}

          <p className="mt-12 rounded-2xl border border-primary/25 bg-card p-5 text-sm text-muted-foreground backdrop-blur-md">
            {DISCLAIMER}
          </p>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Ready to Write Your Own Story?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Get a personalized written relocation plan with visa planning, built around your goals and budget.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/services">
                <Button size="lg" className="bg-gold text-[#1B1203] hover:bg-gold/85">
                  See Services &amp; Pricing
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
                >
                  <PhoneCall data-icon="inline-start" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <aside className="mt-14" aria-labelledby="related-guides">
              <h2 id="related-guides" className="text-center text-2xl font-bold tracking-tight">
                Keep Reading
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r: { slug: string; h1: string; summary: string } | undefined) =>
                  r ? (
                    <Link key={r.slug} to={`/guides/${r.slug}`} className="group block h-full">
                      <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardHeader>
                          <CardTitle className="text-base leading-snug">{r.h1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{r.summary}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : null,
                )}
              </div>
            </aside>
          )}
        </div>
      </article>
    </Layout>
  );
}
