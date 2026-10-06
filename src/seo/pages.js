// SEO + crawler-friendly summary for every page of the site.
// Titles ~50-60 characters, descriptions ~120-160 characters.
// `body` is also written into the pre-rendered HTML so search engines and link
// previews can read the page before any JavaScript runs.

import { GUIDES } from "../content/guides.js";
import { SAMPLE } from "../content/sample.js";
import { LEGAL_DOCS, LEGAL_UPDATED } from "../content/legal.js";

/**
 * @typedef {{
 *   path: string, title: string, description: string, h1: string,
 *   type?: "WebPage"|"AboutPage"|"ContactPage"|"CollectionPage"|"FAQPage",
 *   priority: number, changefreq: string, lastmod: string,
 *   crumb?: string, body: { h2?: string, text?: string, list?: string[] }[],
 *   links?: { href: string, label: string }[]
 * }} PageMeta
 */

const LAST = "2026-10-03";

/** @type {PageMeta[]} */
export const PAGES = [
  {
    path: "/",
    title: "Baby Abroad | Moving Abroad Guides for Women of Color",
    description:
      "Plan your move abroad with confidence. Workbooks, consultations, written relocation plans and hands-on support for women of color moving internationally.",
    h1: "They didn't make the world for us. I went anyway. Now it's Your Turn.",
    type: "WebPage",
    priority: 1.0,
    changefreq: "weekly",
    lastmod: LAST,
    crumb: "Home",
    body: [
      {
        text: "Baby Abroad offers moving abroad guides, workbooks, consultations and written relocation plans for women of color. Founded by Aalijah Herron, an expat since 18 with experience in 10 countries across 3 continents.",
      },
      {
        h2: "Start where you are",
        list: [
          "Gettin' Gone workbook: monetary limits, location planning, necessities and non-negotiables.",
          "Bundled Books: both workbooks together at a lower price.",
          "Consultation + Written Plan: a one-hour meeting with visa planning and a step-by-step plan delivered within 24 business hours.",
          "Hands-On Assistance: weekly or bi-weekly virtual check-ins with job and visa help.",
        ],
      },
      {
        h2: "How it works",
        text: "Start with a consultation and written plan, add personalized plans for more destinations, and keep your momentum with ongoing support.",
      },
    ],
    links: [
      { href: "/services", label: "Relocation services and pricing" },
      { href: "/guides", label: "Free moving abroad guides" },
      { href: "/faq", label: "Moving abroad FAQ" },
      { href: "/contact", label: "Request a personalized quote" },
    ],
  },
  {
    path: "/services",
    title: "Relocation Services & Pricing | Baby Abroad",
    description:
      "Move-abroad workbooks from $5, a $75 consultation with a written relocation plan, and hands-on support for women of color relocating internationally.",
    h1: "Services & Pricing",
    type: "CollectionPage",
    priority: 0.9,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "Services",
    body: [
      {
        text: "Supportive, professional guidance at every stage of your move abroad. All prices are in USD and are indicative until we tailor a plan for you.",
      },
      {
        h2: "Pricing",
        list: [
          "Gettin' Gone workbook: $5 USD",
          "Mentally Expatting Better workbook: $7 USD",
          "Bundled Books: $10 USD",
          "Consultation + Written Plan: $75 USD",
          "Extra Written Plan: $25 per destination (USD)",
          "Hands-On Assistance: from $200 per month (USD)",
        ],
      },
    ],
    links: [
      { href: "/faq", label: "Pricing and process FAQ" },
      { href: "/contact", label: "Get a personalized quote" },
    ],
  },
  {
    path: "/howitworks",
    title: "How It Works: Plan Your Move Abroad | Baby Abroad",
    description:
      "See how Baby Abroad takes you from choosing a destination to a step-by-step relocation plan, with guides, a consultation, extra plans and ongoing support.",
    h1: "How It Works",
    type: "WebPage",
    priority: 0.8,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "How It Works",
    body: [
      {
        text: "A simple, supportive path from idea to arrival.",
        list: [
          "Choose where to start, from a simple guide to a full written plan.",
          "Receive your plan: a consultation with visa planning and a step-by-step written plan within 24 business hours.",
          "Add more destinations with extra written plans.",
          "Keep momentum with hands-on assistance and regular goal check-ins.",
        ],
      },
    ],
    links: [
      { href: "/services", label: "See services and pricing" },
      { href: "/guides/how-to-move-abroad", label: "How to move abroad: an 8-step plan" },
    ],
  },
  {
    path: "/about",
    title: "About Aalijah Herron & Baby Abroad | Expat Since 18",
    description:
      "Baby Abroad was founded by Aalijah Herron, an expat since 18 with experience in 10 countries on 3 continents, to help women and people of color move abroad.",
    h1: "About Baby Abroad",
    type: "AboutPage",
    priority: 0.7,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "About",
    body: [
      {
        text: "Baby Abroad was founded by Aalijah Herron, a Black woman who has been an expat since 18 and has traveled to 10 countries across 3 continents. The mission is to show people of color that life can be better abroad, and to help them take that step.",
      },
    ],
    links: [
      { href: "/services", label: "Services and pricing" },
      { href: "/contact", label: "Contact Baby Abroad" },
    ],
  },
  {
    path: "/contact",
    title: "Contact Baby Abroad | Request a Relocation Quote",
    description:
      "Tell us where you want to move and get a tailored relocation package. Reach Baby Abroad by form, email or WhatsApp. We work with clients worldwide.",
    h1: "Let's Talk About Your Move",
    type: "ContactPage",
    priority: 0.7,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "Contact",
    body: [
      {
        text: "A supportive conversation about your next chapter, with no pressure. Tell us your plans and we'll put together a tailored package for you. Email contact@gobabyabroad.com or message us on WhatsApp at +1 815 616 9684.",
      },
    ],
    links: [
      { href: "/faq", label: "Frequently asked questions" },
      { href: "/services", label: "Services and pricing" },
    ],
  },
  {
    path: "/faq",
    title: "Moving Abroad FAQ for Women of Color | Baby Abroad",
    description:
      "Answers to common questions about moving abroad: costs, timelines, visas, working remotely, our consultations and written relocation plans.",
    h1: "Moving Abroad: Frequently Asked Questions",
    type: "FAQPage",
    priority: 0.8,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "FAQ",
    body: [],
    links: [
      { href: "/guides", label: "Moving abroad guides" },
      { href: "/contact", label: "Ask us a question" },
    ],
  },
  {
    path: "/guides",
    title: "Moving Abroad Guides for Women of Color | Baby Abroad",
    description:
      "Free, practical guides for moving abroad: step-by-step plans, a 12-month checklist, budgeting, visa options and finding community as a woman of color.",
    h1: "Moving Abroad Guides",
    type: "CollectionPage",
    priority: 0.9,
    changefreq: "weekly",
    lastmod: LAST,
    crumb: "Guides",
    body: [
      {
        text: "Free, practical guides to help you plan every step of your move abroad.",
        list: GUIDES.map((g) => `${g.h1}: ${g.summary}`),
      },
    ],
    links: GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.h1 })),
  },
  {
    path: SAMPLE.path,
    title: SAMPLE.seoTitle,
    description: SAMPLE.description,
    h1: SAMPLE.h1,
    type: "WebPage",
    priority: 0.7,
    changefreq: "monthly",
    lastmod: LAST,
    crumb: "Sample Plan",
    sample: SAMPLE,
    body: [],
    links: [
      { href: "/services", label: "Services and pricing" },
      { href: "/contact", label: "Book a consultation" },
    ],
  },
  ...LEGAL_DOCS.map((d) => ({
    path: d.path,
    title: d.seoTitle,
    description: d.description,
    h1: d.h1,
    type: "WebPage",
    priority: 0.3,
    changefreq: "yearly",
    lastmod: LEGAL_UPDATED,
    crumb: d.h1,
    legal: d,
    body: [],
    links: [{ href: "/contact", label: "Contact Baby Abroad" }],
  })),
];

/** Page metadata for article guides (built from the guide content). */
export function guidePage(guide) {
  return {
    path: `/guides/${guide.slug}`,
    title: guide.seoTitle,
    description: guide.description,
    h1: guide.h1,
    type: "WebPage",
    priority: 0.8,
    changefreq: "monthly",
    lastmod: guide.dateModified,
    crumb: guide.h1,
    isArticle: true,
    guide,
    body: [],
    links: [],
  };
}

export const GUIDE_PAGES = GUIDES.map(guidePage);

/** Checkout pages: built like every other page (so a direct visit works) but hidden from search and the sitemap. */
export const CHECKOUT_PAGES = [
  { path: "/checkout", title: "Checkout | Baby Abroad", description: "Secure checkout for Baby Abroad workbooks, consultations and written relocation plans.", h1: "Checkout", noindex: true, priority: 0, changefreq: "never", lastmod: LAST, body: [] },
  { path: "/checkout/return", title: "Order Confirmation | Baby Abroad", description: "Your Baby Abroad order.", h1: "Order confirmation", noindex: true, priority: 0, changefreq: "never", lastmod: LAST, body: [] },
];

export const ALL_PAGES = [...PAGES, ...GUIDE_PAGES, ...CHECKOUT_PAGES];

export function getPage(path) {
  const clean = path.length > 1 ? path.replace(/\/$/, "") : path;
  return ALL_PAGES.find((p) => p.path === clean);
}
