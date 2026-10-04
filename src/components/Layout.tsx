import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { SEOHead, type SEOPage } from "@/components/SEOHead";
import { getPage } from "@/seo/pages.js";

interface LayoutProps {
  children: ReactNode;
  /** Route path, e.g. "/services". Title, description and schema come from src/seo/pages.js. */
  path?: string;
  /** Or pass a full page object (used by the 404 page and the guide articles). */
  page?: SEOPage;
}

export function Layout({ children, path, page }: LayoutProps) {
  const meta = page ?? (path ? (getPage(path) as SEOPage | undefined) : undefined);
  return (
    <>
      {meta && <SEOHead page={meta} />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
