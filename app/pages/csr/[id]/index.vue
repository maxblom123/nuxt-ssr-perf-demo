<script setup>
const route = useRoute()
const listing = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const listings = await $fetch('/api/listings')
    const found = listings.find(l => l.id === route.params.id)
    if (!found) {
      error.value = true
    } else {
      listing.value = found
    }
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div style="max-width: 700px; margin: 2rem auto; padding: 0 1rem;">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">
      <h1>Listing not found</h1>
      <p>We couldn't find this property.</p>
    </div>

    <div v-else>
      <img :src="listing.image" :alt="listing.address" style="width: 100%; border-radius: 8px;" />
      <h1>{{ listing.address }}</h1>
      <p>€{{ listing.price.toLocaleString() }} · {{ listing.sqm }}m² · {{ listing.bedrooms }} bedroom(s)</p>
      <p>{{ listing.description }}</p>
    </div>
  </div>
</template>