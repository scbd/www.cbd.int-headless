<template>
  <notification-search @search="onSearch" />
  <notification-search-list :search-params="searchParams" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const searchParams = ref<{ fieldQueries?: string; startDate?: string; endDate?: string }>()

function onSearch (params: { fieldQueries?: string; startDate?: string; endDate?: string }) {
  searchParams.value = params
}
</script>