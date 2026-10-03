// Builds every <head> tag and the JSON-LD structured data for a page.
// Used in two places so they can never disagree:
//   1. src/components/SEOHead.tsx  (runtime, via react-helmet-async)
//   2. scripts/prerender.mjs       (build time, written into dist/**/index.html)

import { SITE, absoluteUrl } from "./site.js";
import { OFFERS } from "./offers.js";
import { FAQS } from "../content/faq.js";
import { ALL_PAGES, getPage } from "./pages.js";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    slogan: "They didn't make the world for us. I went anyway. Now it's your turn.",
    logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo), width: 512, height: 512 },
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    founder: { "@type": "Person", name: SITE.founder, jobTitle: "Founder" },
    sameAs: SITE.sameAs,
    // Not a local business: Baby Abroad serves clients anywhere in the world, online.
    areaServed: "Worldwide",
    availableLanguage: "English",
    knowsAbout: [
      "Moving abroad",
      "International relocation planning",
      "Expat life",
      "Visa planning",
      "Relocation for women of color",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Baby Abroad relocation services",
      itemListElement: OFFERS.map((o) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: o.price,
        itemOffered: { "@type": "Service", name: o.name, description: o.description },
      })),
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": ORG_ID },
  };
}

function breadcrumbs(page) {
  const items = [{ name: "Home", path: "/" }];
  if (page.isArticle) items.push({ name: "Guides", path: "/guides" });
  if (page.path !== "/") items.push({ name: page.crumb || page.h1, path: page.path });
  return items;
}

function breadcrumbNode(page) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: breadcrumbs(page).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

function faqNode(url) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function articleNode(page, url) {
  const g = page.guide;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: g.h1,
    description: g.description,
    image: absoluteUrl(SITE.ogImage),
    datePublished: g.datePublished,
    dateModified: g.dateModified,
    inLanguage: SITE.language,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@type": "Person", name: SITE.founder },
    publisher: { "@id": ORG_ID },
  };
}

function buildGraph(page) {
  const url = absoluteUrl(page.path);
  const webPage = {
    "@type": page.type || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(SITE.ogImage) },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
  if (page.lastmod) webPage.dateModified = page.lastmod;

  const graph = [organizationNode(), websiteNode(), webPage];
  if (page.path !== "/") graph.push(breadcrumbNode(page));
  if (page.type === "FAQPage") graph.push(faqNode(url));
  if (page.isArticle) graph.push(articleNode(page, url));
  return graph;
}

/**
 * Everything that belongs in <head> for a page.
 * @param {{ path: string, title: string, description: string, noindex?: boolean, isArticle?: boolean }} page
 */
export function buildHead(page) {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(SITE.ogImage);
  const robots = page.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  /** @type {{ tag: "meta" | "link", attrs: Record<string, string> }[]} */
  const tags = [
    { tag: "meta", attrs: { name: "description", content: page.description } },
    { tag: "meta", attrs: { name: "robots", content: robots } },
    { tag: "link", attrs: { rel: "canonical", href: url } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE.name } },
    { tag: "meta", attrs: { property: "og:locale", content: SITE.locale } },
    { tag: "meta", attrs: { property: "og:type", content: page.isArticle ? "article" : "website" } },
    { tag: "meta", attrs: { property: "og:title", content: page.title } },
    { tag: "meta", attrs: { property: "og:description", content: page.description } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
    { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", attrs: { property: "og:image:alt", content: SITE.ogImageAlt } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: page.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: page.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } },
    { tag: "meta", attrs: { name: "twitter:image:alt", content: SITE.ogImageAlt } },
  ];
  if (page.isArticle && page.guide) {
    tags.push(
      { tag: "meta", attrs: { property: "article:published_time", content: page.guide.datePublished } },
      { tag: "meta", attrs: { property: "article:modified_time", content: page.guide.dateModified } },
      { tag: "meta", attrs: { property: "article:author", content: SITE.founder } },
    );
  }

  const jsonLd = page.noindex ? null : { "@context": "https://schema.org", "@graph": buildGraph(page) };
  return { title: page.title, tags, jsonLd };
}

export { ALL_PAGES, getPage };
