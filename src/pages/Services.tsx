import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  
} from "@/components/ui/table";
import {
  Plane,
  Compass,
  Package,
  MessageSquare,
  Map,
  Headset,
  PhoneCall,
  Info,
  Plus,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart";


const SERVICES = [
  {
    icon: Plane,
    title: "Gettin' Gone",
    desc: "A workbook on the physical side of moving — monetary limits, location planning, necessities, and non-negotiables, to narrow down where you'll go.",
  },
  {
    icon: Compass,
    title: "Mentally Expatting Better",
    desc: "A workbook centered on the mindset — mental preparation for leaving home and finding peace of mind.",
  },
  {
    icon: Package,
    title: "Bundled Books",
    desc: "Both workbooks together at a lower price — ideal for PoCs evaluating what works best.",
  },
  {
    icon: MessageSquare,
    title: "Consultation + Written Plan",
    desc: "A 1-hour meeting covering visa planning and a step-by-step written plan, delivered via email and PDF within 24 business hours.",
  },
  {
    icon: Map,
    title: "Extra Written Plans",
    desc: "Add a personalized written plan for each additional destination you are considering.",
  },
  {
    icon: Headset,
    title: "Hands-On Assistance",
    desc: "Weekly or bi-weekly virtual check-ins for updates and progress, plus job and visa assistance — scaling with how much support you need.",
  },
];

const PRICING_ROWS = [
  {
    service: "Gettin' Gone",
    productId: "gettin-gone",
    price: "$5 USD",
    details: "Workbook — monetary limits, location planning, necessities & non-negotiables.",
  },
  {
    service: "Mentally Expatting Better",
    productId: "mentally-expatting-better",
    price: "$7 USD",
    details: "Workbook — mindset & mental preparation for leaving home.",
  },
  {
    service: "Bundled Books",
    productId: "bundled-books",
    price: "$10 USD",
    details: "Both workbooks bundled at a lower price. Caters to PoCs evaluating what works best.",
  },
  {
    service: "Consultation + Written Plan",
    productId: "consultation-written-plan",
    price: "$75 USD",
    details:
      "1-hour meeting · visa planning + step-by-step plan · delivered via email & PDF within 24 business hours.",
  },
  {
    service: "Extra Written Plan",
    productId: "extra-written-plan",
    price: "$25 / destination (USD)",
    details: "Add-on for each additional destination.",
  },
  {
    service: "Hands-On Assistance",
    price: "From $200 / month (USD)",
    details: "Weekly or bi-weekly virtual check-ins · job & visa assistance · scales with your needs.",
  },
];

function AddButton({ productId, name }: { productId: string; name: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <Button
      size="sm"
      variant={done ? "secondary" : "default"}
      aria-label={`Add ${name} to cart`}
      onClick={() => {
        add(productId);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <Check data-icon="inline-start" /> : <Plus data-icon="inline-start" />}
      {done ? "Added" : "Add"}
    </Button>
  );
}

function RowAction({ row }: { row: { service: string; productId?: string } }) {
  return row.productId ? (
    <AddButton productId={row.productId} name={row.service} />
  ) : (
    <Link to="/contact">
      <Button size="sm" variant="outline">Get a quote</Button>
    </Link>
  );
}

export default function Services() {
  return (
    <Layout path="/services">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Services & Pricing
            </h1>
            <Ornament className="mt-4" />
            <p className="mt-4 text-muted-foreground">
              Supportive, professional guidance at every stage of your move abroad.
            </p>
          </div>

          {/* Service cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Card
                key={service.title}
                className="transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader>
                  <service.icon className="mb-2 size-8 text-primary" aria-hidden="true" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing table */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-balance text-center md:text-4xl">
              Pricing
            </h2>
            <Ornament className="mt-3" />
            <p className="mt-3 text-center text-muted-foreground">
              Simple, transparent pricing. All prices in USD.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-primary/25 bg-card backdrop-blur-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60 hover:bg-muted/60">
                    <TableHead className="w-[28%]">Service</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[36%]">Details</TableHead>
                    <TableHead className="hidden w-[16%] text-right md:table-cell"><span className="sr-only">Add to cart</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PRICING_ROWS.map((row) => (
                    <TableRow key={row.service}>
                      <TableCell className="font-medium">
                        {row.service}
                        <div className="mt-2 md:hidden">
                          <RowAction row={row} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="h-auto px-2.5 py-0.5 text-sm font-semibold text-primary">{row.price}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.details}
                      </TableCell>
                      <TableCell className="hidden text-right md:table-cell">
                        <RowAction row={row} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        Hands-On Assistance is quoted to fit your needs. Everything else can be added to your cart and paid for securely right here.
                      </span>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Consultations and written plans are delivered via email &amp; PDF within 24 business
              hours and are scheduled through email. No refunds.
            </p>
          </div>

          {/* CTA */}
          <div className="relative mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[var(--cta-from)] to-[var(--cta-to)] p-8 text-center backdrop-blur-md before:pointer-events-none before:absolute before:inset-3 before:rounded-[1.4rem] before:border before:border-gold/25 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Not Sure What You Need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Reach out and we will help you find the right starting point.
            </p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="lg">
                <PhoneCall data-icon="inline-start" />
                Get a Personalized Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}