import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, Plane, Package, HeartHandshake } from "lucide-react";


const HIGHLIGHTS = [
  { icon: Plane, title: "10 countries", desc: "Experienced across three continents." },
  { icon: Globe, title: "Expat since 18", desc: "A perspective shaped by years abroad." },
  { icon: Package, title: "Made for PoCs", desc: "Resources built to help you evaluate what works best." },
  { icon: HeartHandshake, title: "Support first", desc: "Judgment-free guidance at your own pace." },
];

export default function About() {
  return (
    <Layout path="/about">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              About Baby Abroad
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              They didn't make the world for us. I went anyway. Now it's Your Turn.
            </p>
          </div>

          {/* Founder story */}
          <div className="mx-auto mt-12 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>The Story</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-muted-foreground">
                  Baby Abroad was founded by Aalijah Herron, a Black woman who has been an expat
                  since 18 and has traveled to 10 countries across 3 continents.
                </p>
                <p className="text-muted-foreground">
                  The mission is simple: to show people of color that life can be better abroad —
                  and to help them take that step. We serve PoCs who have never left the US or
                  aren't sure where to go next, as well as younger-generation expats looking to
                  make their first move.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Highlights */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <item.icon className="mb-2 size-8 text-primary" aria-hidden="true" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Your Move Starts Here
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Explore our services and pricing to find the right starting point for you.
            </p>
            <Link to="/services" className="mt-6 inline-block">
              <Button size="lg">See Services &amp; Pricing</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}