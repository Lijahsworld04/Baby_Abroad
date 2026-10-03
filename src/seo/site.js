// Single source of truth for site-wide SEO facts.
// Change SITE.url here (and nowhere else) if the domain ever changes.

export const SITE = {
  url: "https://gobabyabroad.com",
  name: "Baby Abroad",
  tagline: "Moving abroad guides, workbooks and consultations for women of color",
  description:
    "Baby Abroad helps women of color plan a move abroad with workbooks, one-on-one consultations, step-by-step written relocation plans and hands-on support.",
  locale: "en_US",
  language: "en",
  founder: "Aalijah Herron",
  email: "contact@gobabyabroad.com",
  phone: "+18156169684",
  whatsapp: "https://wa.me/18156169684",
  sameAs: ["https://instagram.com/babyabroadofficial", "https://tiktok.com/@babyabroadofficial"],
  ogImage: "/og-image.png",
  ogImageAlt: "Baby Abroad: relocation guides and consultations for women of color moving abroad",
  logo: "/logo.png",
  themeColor: "#021E12",
  published: "2026-10-03",
};

/** Turn a path like "/services" into a full URL. The home page keeps its trailing slash. */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}
