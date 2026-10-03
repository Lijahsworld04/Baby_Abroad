import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Map, Headset, Plane } from "lucide-react";


const STEPS = [
  {
    icon: Plane,
    title: "Choose Where to Start",
    desc: "Begin with the offering that fits where you are now, from a simple guide to a full written plan.",
  },
  {
    icon: FileText,
    title: "Receive Your Plan",
    desc: "A consultation with visa planning and a step-by-step written plan, delivered via email & PDF within 24 business hours.",
  },
  {
    icon: Map,
    title: "Add More Destinations",
    desc: "Extend your planning with extra written plans for each additional destination.",
  },
  {
    icon: Headset,
    title: "Keep Momentum",
    desc: "With hands-on assistance, stay on track through regular goal check-ins until you are ready to go.",
  },
];

export default function HowItWorks() {
  return (
    <Layout path="/howitworks">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              How It Works
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              A simple, supportive path from idea to arrival.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="relative h-full">
                <Badge
                  className="absolute top-4 right-4 h-auto px-3 font-script text-lg font-normal"
                  variant="secondary"
                >
                  Step {i + 1}
                </Badge>
                <CardHeader>
                  <step.icon className="mb-2 size-8 text-primary" aria-hidden="true" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Ready When You Are
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Every journey starts with a single step. We can help you plan yours.
            </p>
            <Link to="/services" className="mt-6 inline-block">
              <Button size="lg">Explore Services</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}