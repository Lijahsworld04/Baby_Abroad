import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout
      page={{
        path: "/404",
        title: "Page Not Found | Baby Abroad",
        description: "This page could not be found. Head back to Baby Abroad to keep planning your move abroad.",
        noindex: true,
      }}
    >
      <section className="flex flex-1 items-center py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="font-script text-4xl text-primary">This chapter is missing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Page Not Found</h1>
          <Ornament className="mt-4" />
          <p className="mt-4 text-muted-foreground">
            We could not find the page you were looking for, but your story is still waiting to be written.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/">
              <Button size="lg" className="bg-gold text-[#1B1203] hover:bg-gold/85">
                Back to Home
              </Button>
            </Link>
            <Link to="/guides">
              <Button
                size="lg"
                variant="outline"
                className="border-gold bg-transparent text-primary hover:bg-gold/15 hover:text-primary"
              >
                Read the Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
