import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { GUIDES } from "@/content/guides.js";

export default function Guides() {
  return (
    <Layout path="/guides">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Moving Abroad Guides
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Free, practical guides for women of color planning a move abroad, from your first idea
              to your first month in a new country.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.slug} to={`/guides/${g.slug}`} className="group block h-full">
                <Card className="h-full transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl leading-snug">{g.h1}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <p className="text-muted-foreground">{g.summary}</p>
                    <div className="mt-auto flex items-center justify-between text-sm text-primary">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden="true" />
                        {g.readMinutes} min read
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold">
                        Read guide <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
