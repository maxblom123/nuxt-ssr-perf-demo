# Nuxt 3 SSR vs CSR Performance Demo

Comparing client-side rendering against SSR + ISR on a listing-detail page, measured with Lighthouse, not claimed.

**Live demo:** https://nuxt-ssr-perf-demo.vercel.app/csr/1 (CSR) vs https://nuxt-ssr-perf-demo.vercel.app/ssr/1 (SSR)

## Results

| | CSR | SSR |
|---|---|---|
| Performance | 97 | 97 |
| Accessibility | 86 | 92 |
| Best Practices | 100 | 100 |
| **SEO** | **83** | **100** |

![CSR Lighthouse summary](docs/lighthouse/csr-summary.png)
![SSR Lighthouse summary](docs/lighthouse/ssr-summary.png)

The Performance score is roughly a wash on this small demo. The real, specific difference is SEO: Lighthouse flags the CSR version for a missing `<title>` and missing meta description, because the page is empty until client-side JS resolves the fetch. The SSR version scores a clean 100 — same content, same design, only the rendering strategy differs.

![CSR SEO detail](docs/lighthouse/csr-seo-detail.png)
![SSR SEO detail](docs/lighthouse/ssr-seo-detail.png)

## What changed technically

- `useAsyncData` resolves the listing server-side, so the HTML sent to the browser already contains the content, no loading flash, no empty initial payload.
- `useSeoMeta` sets real `<title>` and meta tags at render time, so crawlers and link previews see actual content.
- `routeRules` apply ISR (`isr: 60`) to `/ssr/**` rather than full SSG or plain SSR: SSG would go stale the moment listing data changes, since prices/availability update independently of deploys; plain SSR re-renders on every request, which is wasteful for content that doesn't change every second. ISR caches the render and regenerates it in the background after the TTL expires.
- Missing listings return a real HTTP 404 (`createError`) on the SSR route — confirmed via the browser tab title showing "404 - Listing not found", versus the CSR route, which returns 200 with client-rendered "not found" text, invisible to crawlers as an actual error.

## Running it