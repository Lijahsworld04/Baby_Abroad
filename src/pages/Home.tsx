import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ornament } from "@/components/Ornament";
import { TESTIMONIALS } from "@/content/testimonials.js";
import { SureSlider } from "@/components/SureSlider";
import { GUIDES } from "@/content/guides.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Plane,
  ArrowRight,
  PlaneTakeoff,
  Package,
  FileText,
  Headset,
  CheckCircle2,
  Clock,
  Heart,
  Compass,
  Globe2,
} from "lucide-react";


const STATS = [
  { value: 10, suffix: "+", label: "Clients and counting" },
  { value: 75, prefix: "$", label: "Consultation + plan" },
  { value: 35, prefix: "$", label: "Hands-on assistance intro call" },
];

const FEATURES = [
  {
    icon: PlaneTakeoff,
    title: "Gettin' Gone",
    desc: "A workbook on the physical side — monetary limits, location planning, necessities, and non-negotiables.",
  },
  {
    icon: Package,
    title: "Bundled Books",
    desc: "Both workbooks together at a lower price — ideal for PoCs evaluating what works best.",
  },
  {
    icon: FileText,
    title: "Consultation + Written Plan",
    desc: "A 1-hour meeting with visa planning and a step-by-step plan delivered within 24 business hours.",
  },
  {
    icon: Headset,
    title: "Hands-On Assistance",
    desc: "Weekly or bi-weekly virtual check-ins with job & visa help, scaling with what you need.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Your Written Plan",
    desc: "Start with a consultation and written plan that maps out your visa and next steps.",
  },
  {
    icon: Plane,
    title: "Extra Plans for More Destinations",
    desc: "Add personalized written plans for each destination you're considering.",
  },
  {
    icon: Headset,
    title: "Ongoing Support",
    desc: "Keep momentum with regular check-ins and hands-on assistance along the way.",
  },
];

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl [font-variant-numeric:lining-nums]">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <Layout path="/">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8 md:pt-24">
          <Badge
            variant="outline"
            className="mb-6 h-auto border-primary/30 bg-primary/10 px-4 py-1 text-base font-semibold tracking-wide text-primary italic"
          >
            Expat since 18 · 10 countries · 3 continents
          </Badge>
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
            They didn't make the world for us. I went{" "}
            <span className="text-highlight italic">anyway</span>. Now it's{" "}
            <span className="text-highlight italic">Your Turn</span>.
          </h1>
          <h2 className="mt-5 max-w-2xl text-balance font-heading text-xl font-semibold text-primary md:text-2xl">
            Moving abroad guides, workbooks and consultations for women of color
          </h2>
          <p className="mt-3 max-w-xl text-balance text-lg text-muted-foreground">
            From a simple guide to a hands-on assistant, we help you plan your move with confidence.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/services">
              <Button
                size="lg"
                className="w-full bg-gold text-[#1B1203] hover:bg-gold/85 sm:w-auto"
              >
                Explore Services
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-gold bg-transparent text-primary hover:bg-gold/15 hover:text-primary sm:w-auto"
              >
                Get a Personalized Quote
              </Button>
            </Link>
          </div>

          {/* Pricing stat cards */}
          <ul className="mt-16 grid w-full grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <li key={stat.label} className="list-none">
              <Card>
                <CardContent className="flex flex-col items-center gap-1 p-4 sm:p-6">
                  <Counter value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix ?? ""} />
                  <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SureSlider />

      {/* Product / service cards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Start Where You Are
            </h2>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Simple offerings that meet you wherever you are in your planning.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader>
                  <feature.icon className="mb-2 size-8 text-primary" aria-hidden="true" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-gold/60 bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
              >
                See Full Pricing
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              How It Works
            </h2>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              A simple, supportive path from idea to arrival.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Relocation Planning Made for Women of Color
            </h2>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Moving abroad is more than visas and flights. It is safety, belonging and finding a place that
              feels like home. Baby Abroad guides you through the practical and personal sides of an international move.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Choose where to go",
                desc: "Compare destinations on budget, visa options, safety, community and everyday life so you pick a place where you can thrive.",
              },
              {
                icon: Globe2,
                title: "Plan for any country",
                desc: "We are an international relocation service with no local office. Your plan is built for the destination you choose, anywhere in the world.",
              },
              {
                icon: Heart,
                title: "Feel supported",
                desc: "Judgment-free guidance, honest answers and a plan you can follow at your own pace, from your first idea to your first month abroad.",
              },
            ].map((item) => (
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
        </div>
      </section>

      {/* Free guides */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Start Your Story With Our Free Guides
            </h2>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Step-by-step help for every stage of your move abroad. You can also browse the{" "}
              <Link to="/faq" className="text-primary underline underline-offset-4">
                moving abroad FAQ
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUIDES.slice(0, 3).map((g) => (
              <Link key={g.slug} to={`/guides/${g.slug}`} className="group block h-full">
                <Card className="h-full transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl leading-snug">{g.h1}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <p className="text-muted-foreground">{g.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-primary">
                      <Clock className="size-4" aria-hidden="true" />
                      {g.readMinutes} min read
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/guides">
              <Button
                variant="outline"
                size="lg"
                className="border-gold/60 bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
              >
                See All Guides
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24" aria-labelledby="kind-words">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="kind-words" className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Kind Words From Our Clients
            </h2>
            <Ornament className="mt-4" />
          </div>
          {TESTIMONIALS.map((t: { name: string; detail: string; date?: string; quote: string }) => (
            <figure key={t.name} className="mt-10">
              <Card>
                <CardContent className="p-6 sm:p-10">
                  <blockquote className="text-lg leading-relaxed">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 font-heading text-primary">
                    {t.name}
                    <span className="block text-sm text-muted-foreground">{t.detail}</span>
                    {t.date && (
                      <time dateTime={t.date} className="block text-sm text-muted-foreground">
                        {new Date(t.date + "T00:00:00").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    )}
                  </figcaption>
                </CardContent>
              </Card>
            </figure>
          ))}
          <div className="mt-8 text-center">
            <Link to="/sample-plan">
              <Button
                size="lg"
                variant="outline"
                className="border-gold bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
              >
                See a Sample Plan
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-foreground before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <CardContent className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
                Ready to Start Planning?
              </h2>
              <p className="max-w-xl text-muted-foreground">
                Request a personalized quote and we will help you find the right starting point. Prices are indicative only until we tailor a plan for you.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="mt-2 bg-gold text-[#1B1203] hover:bg-gold/85"
                >
                  <Plane data-icon="inline-start" />
                  Get in Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}