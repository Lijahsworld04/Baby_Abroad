# Baby Abroad

Website for [Baby Abroad](https://gobabyabroad.com): moving abroad guides, workbooks, consultations and written relocation plans, built for women of color.

**Stack:** Vite, React, TypeScript, Tailwind CSS v4, shadcn/ui, react-router-dom, react-helmet-async, EmailJS.

## Run it locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

This type-checks, builds the app with Vite, then runs `scripts/prerender.mjs`, which writes a static HTML page (with title, meta tags, structured data and readable content) for every route, plus `sitemap.xml` and `robots.txt`. Output goes to `dist/`.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`

## Where things live

- `src/content/` — guides, FAQ, privacy/terms, testimonials and the sample plan
- `src/seo/` — site settings, page titles and descriptions, structured data
- `src/pages/` — page components
- `scripts/prerender.mjs` — build-time prerender, sitemap and robots
