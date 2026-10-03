// Runs after `vite build`. Zero extra dependencies.
//
// For every page it writes dist/<path>/index.html containing:
//   - the correct <title>, meta description, canonical, Open Graph / Twitter tags
//   - JSON-LD structured data (Organization, WebSite, Breadcrumb, FAQ, Article...)
//   - real, readable content (headings, text, internal links) inside #root
// React replaces that content as soon as the app loads, so visitors still get the
// full interactive site, while search engines and link previews get a complete page.
//
// It also writes dist/sitemap.xml and dist/robots.txt so they always match the pages.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE, absoluteUrl } from "../src/seo/site.js";
import { ALL_PAGES } from "../src/seo/pages.js";
import { buildHead } from "../src/seo/schema.js";
import { FAQS } from "../src/content/faq.js";
import { DISCLAIMER, getGuide } from "../src/content/guides.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const templatePath = join(dist, "index.html");

if (!existsSync(templatePath)) {
  console.error("prerender: dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}
const template = readFileSync(templatePath, "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrs = (o) =>
  Object.entries(o)
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(" ");

function headHtml(page) {
  const h = buildHead(page);
  const lines = [`<title>${esc(h.title)}</title>`];
  for (const t of h.tags) lines.push(`<${t.tag} ${attrs(t.attrs)} data-static-seo="true" />`);
  if (h.jsonLd) {
    const json = JSON.stringify(h.jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" data-static-seo="true">${json}</script>`);
  }
  return lines.join("\n    ");
}

const NAV = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/howitworks", "How It Works"],
  ["/guides", "Guides"],
  ["/faq", "FAQ"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

function list(items, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`;
}

function bodyHtml(page) {
  const out = [];
  out.push(`<h1>${esc(page.h1)}</h1>`);

  if (page.isArticle && page.guide) {
    const g = page.guide;
    out.push(`<p>${esc(`${g.readMinutes} min read. By ${SITE.founder}. Updated ${g.dateModified}.`)}</p>`);
    g.intro.forEach((p) => out.push(`<p>${esc(p)}</p>`));
    g.sections.forEach((s) => {
      out.push(`<h2>${esc(s.h2)}</h2>`);
      (s.paragraphs || []).forEach((p) => out.push(`<p>${esc(p)}</p>`));
      if (s.list) out.push(list(s.list, s.ordered));
      (s.after || []).forEach((p) => out.push(`<p>${esc(p)}</p>`));
    });
    out.push(`<p>${esc(DISCLAIMER)}</p>`);
    out.push("<h2>Keep reading</h2>");
    out.push(
      list([]).replace(
        "<ul></ul>",
        `<ul>${g.related
          .map((slug) => getGuide(slug))
          .filter(Boolean)
          .map((r) => `<li><a href="/guides/${r.slug}">${esc(r.h1)}</a></li>`)
          .join("")}</ul>`,
      ),
    );
  } else if (page.sample) {
    const sm = page.sample;
    out.push(`<p>${esc(sm.intro)}</p>`, `<p>${esc(sm.note)}</p>`);
    sm.sections.forEach((s) => {
      out.push(`<h2>${esc(s.h2)}</h2>`);
      (s.paragraphs || []).forEach((p) => out.push(`<p>${esc(p)}</p>`));
      if (s.table) {
        out.push(
          `<table><thead><tr>${s.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.table.rows
            .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
            .join("")}</tbody></table>`,
        );
      }
      if (s.list) out.push(list(s.list));
      (s.after || []).forEach((p) => out.push(`<p>${esc(p)}</p>`));
    });
  } else if (page.legal) {
    out.push(`<p>${esc(page.legal.intro)}</p>`);
    page.legal.sections.forEach((s) => {
      out.push(`<h2>${esc(s.h2)}</h2>`);
      (s.paragraphs || []).forEach((p) => out.push(`<p>${esc(p)}</p>`));
      if (s.list) out.push(list(s.list));
    });
  } else if (page.type === "FAQPage") {
    FAQS.forEach((f) => {
      out.push(`<h2>${esc(f.q)}</h2>`, `<p>${esc(f.a)}</p>`);
    });
  } else {
    for (const b of page.body) {
      if (b.h2) out.push(`<h2>${esc(b.h2)}</h2>`);
      if (b.text) out.push(`<p>${esc(b.text)}</p>`);
      if (b.list) out.push(list(b.list));
    }
  }

  if (page.links?.length) {
    out.push("<h2>Explore more</h2>");
    out.push(`<ul>${page.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>`);
  }
  return out.join("\n      ");
}

function rootHtml(page) {
  return `<div id="root" data-static><header><nav aria-label="Main"><a href="/">${esc(SITE.name)}</a> ${NAV.map(
    ([href, label]) => `<a href="${href}">${esc(label)}</a>`,
  ).join(" ")}</nav></header>
    <main>
      ${bodyHtml(page)}
    </main>
    <footer><p>${esc(SITE.name)} · <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p></footer></div>`;
}

function render(page) {
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, headHtml(page));
  html = html.replace('<div id="root"></div>', rootHtml(page));
  return html;
}

let count = 0;
for (const page of ALL_PAGES) {
  const html = render(page);
  const file = page.path === "/" ? templatePath : join(dist, page.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count++;
}

// sitemap.xml (only real, indexable pages)
const urls = ALL_PAGES.map(
  (p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`,
).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
writeFileSync(join(dist, "robots.txt"), robots);

console.log(`prerender: wrote ${count} pages, sitemap.xml and robots.txt`);
