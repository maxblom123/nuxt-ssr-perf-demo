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
  <div style="max-width: 700px; margin: 2rem auto; padding: 0 1rem;">
    <img :src="listing.image" :alt="listing.address" style="width: 100%; border-radius: 8px;" />
    <h1>{{ listing.address }}</h1>
    <p>{{ formatPrice(listing.price) }} · {{ listing.sqm }}m² · {{ listing.bedrooms }} bedroom(s)</p>
    <p>{{ listing.description }}</p>
  </div>
</template>