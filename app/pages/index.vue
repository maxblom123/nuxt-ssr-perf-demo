<script setup>
useSeoMeta({
  title: 'Nuxt SSR vs CSR — a measured comparison',
  description: 'Two versions of the same listing page. One client rendered, one server rendered with ISR. Pick a side to compare.'
})
</script>

<template>
  <div class="page">
    <div class="content">
      <p class="kicker">A rendering comparison</p>
      <h1>Same listing, two ways of building the page</h1>
      <p class="lede">
        Identical data and layout. What differs is whether the content exists
        before the page reaches you, or only after the browser fetches it.
      </p>

      <div class="split">
        <NuxtLink to="/csr/1" class="option">
          <span class="tag">Client rendered</span>
          <p class="detail">Fetches data after load. No title or meta description until JS runs.</p>
        </NuxtLink>

        <div class="divider" aria-hidden="true"></div>

        <NuxtLink to="/ssr/1" class="option">
          <span class="tag">Server rendered, ISR</span>
          <p class="detail">Content and meta tags are resolved before the response is sent.</p>
        </NuxtLink>
      </div>

      <p class="footnote">
        Lighthouse results and the reasoning are written up in the
        <a href="https://github.com/maxblom123/nuxt-ssr-perf-demo" target="_blank" rel="noopener">README</a>.
      </p>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

<style scoped>
.page {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  font-family: Georgia, "Times New Roman", serif;
  color: #1a1a1a;
}

.content {
  max-width: 640px;
  width: 100%;
}

.kicker {
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  color: #767671;
  margin: 0 0 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

h1 {
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 1rem;
  font-weight: 400;
}

.lede {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #444;
  margin: 0 0 2.5rem;
  max-width: 54ch;
}

.split {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.divider {
  width: 1px;
  align-self: stretch;
  background: #ddd;
}

.option {
  display: block;
  text-decoration: none;
  color: inherit;
}

.tag {
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #1a1a1a;
}

.option:hover .tag {
  text-decoration: underline;
}

.detail {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

.footnote {
  margin-top: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.85rem;
  color: #888;
}

.footnote a {
  color: #1a1a1a;
}

@media (max-width: 560px) {
  .split {
    grid-template-columns: 1fr;
  }
  .divider {
    display: none;
    height: 1px;
    width: 100%;
  }
}
</style>