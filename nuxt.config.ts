// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],

  image: {
    domains: ['images.unsplash.com']
  },

  routeRules: {
    // Listing pages use ISR (Incremental Static Regeneration) rather than
    // full SSG or plain SSR:
    // - Full static (SSG) would go stale the moment listing data changes,
    //   since prices/availability update independently of deploys.
    // - Plain SSR re-runs the full render on every single request, which
    //   is wasteful for content that doesn't change every second.
    // ISR caches the rendered page and regenerates it in the background
    // after the TTL expires, giving near-static speed with periodic
    // freshness. 60s here is deliberately short for demo purposes.
    '/ssr/**': { isr: 60 }
  }
})