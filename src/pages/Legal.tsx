import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LEGAL, LEGAL_UPDATED } from "@/content/legal.js";

interface Section {
  h2: string;
  paragraphs?: string[];
  list?: string[];
}

function LegalPage({ doc, path, other }: { doc: (typeof LEGAL)["privacy"]; path: string; other: { to: string; label: string } }) {
  return (
    <Layout path={path}>
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: doc.h1 }]} />
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{doc.h1}</h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated{" "}
              <time dateTime={LEGAL_UPDATED}>
                {new Date(LEGAL_UPDATED + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </header>

          <p className="mt-10 text-lg leading-relaxed">{doc.intro}</p>

          {(doc.sections as Section[]).map((s) => (
            <section key={s.h2} className="mt-9">
              <h2 className="text-2xl font-bold tracking-tight text-balance">{s.h2}</h2>
              <div className="mt-3 space-y-3 text-lg leading-relaxed">
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <p className="mt-12 text-center text-muted-foreground">
            See also our{" "}
            <Link to={other.to} className="text-primary underline underline-offset-4">
              {other.label}
            </Link>
            .
          </p>
        </div>
      </article>
    </Layout>
  );
}

export function Privacy() {
  return <LegalPage doc={LEGAL.privacy} path="/privacy" other={{ to: "/terms", label: "Terms of Service" }} />;
}

export function Terms() {
  return <LegalPage doc={LEGAL.terms} path="/terms" other={{ to: "/privacy", label: "Privacy Policy" }} />;
}
