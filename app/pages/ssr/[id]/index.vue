<script setup>
const route = useRoute()

const { data: listing, error } = await useAsyncData(
  `listing-${route.params.id}`,
  async () => {
    const listings = await $fetch('/api/listings')
    const found = listings.find(l => l.id === route.params.id)
    if (!found) {
      throw createError({ statusCode: 404, statusMessage: 'Listing not found' })
    }
    return found
  }
)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Listing not found' })
}

useSeoMeta({
  title: () => `${listing.value.address} — ${formatPrice(listing.value.price)}`,
  description: () => listing.value.description,
  ogTitle: () => listing.value.address,
  ogDescription: () => listing.value.description,
  ogImage: () => listing.value.image
})
</script>

<template>
  <div class="page">
    <div class="content">
      <NuxtImg :src="listing.image" :alt="listing.address" class="photo" width="800" height="500" />
      <h1>{{ listing.address }}</h1>
      <p class="meta">{{ formatPrice(listing.price) }} &middot; {{ listing.sqm }}m&sup2; &middot; {{ listing.bedrooms }} bedroom(s)</p>
      <p class="desc">{{ listing.description }}</p>
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
  padding: 1.5rem;
  font-family: Georgia, "Times New Roman", serif;
  color: #1a1a1a;
}

.content {
  max-width: 600px;
  width: 100%;
}

.photo {
  width: 100%;
  max-height: 40vh;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

h1 {
  font-size: 1.7rem;
  line-height: 1.3;
  margin: 1.25rem 0 0.5rem;
  font-weight: 400;
}

.meta {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 0.75rem;
}

.desc {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  margin: 0;
}
</style>