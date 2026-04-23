<template>
  <search-form @search="onSearch" />
  <search-results-list v-if="searchParams" :search-params="searchParams" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const searchParams = ref<{ sort?: string; search?: string }>()

function onSearch(params: { sort?: string; search?: string }) {
  searchParams.value = params
}
</script>