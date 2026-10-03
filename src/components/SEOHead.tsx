import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { buildHead } from "@/seo/schema.js";
import { SITE } from "@/seo/site.js";

export interface SEOPage {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  isArticle?: boolean;
  [key: string]: unknown;
}

/**
 * Writes the title, meta tags, canonical URL, Open Graph / Twitter tags and
 * JSON-LD structured data for a page. All the tag logic lives in src/seo/schema.js
 * so the build-time pre-renderer produces exactly the same tags.
 *
 * Pre-rendered tags carry data-static-seo and are removed once React mounts.
 */
export function SEOHead({ page }: { page: SEOPage }) {
  const head = buildHead(page);
  useEffect(() => {
    // React now owns the head: drop the pre-rendered copies so tags are never duplicated.
    document.querySelectorAll("[data-static-seo]").forEach((el) => el.remove());
  }, []);
  return (
    <Helmet>
      <html lang={SITE.language} />
      <title>{head.title}</title>
      {head.tags.map((t, i) =>
        t.tag === "link" ? (
          <link key={i} {...t.attrs} />
        ) : (
          <meta key={i} {...t.attrs} />
        ),
      )}
      {head.jsonLd && <script type="application/ld+json">{JSON.stringify(head.jsonLd)}</script>}
    </Helmet>
  );
}
