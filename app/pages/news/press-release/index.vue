<template>
  <press-release-search @search="onSearch" />
  <press-release-search-list :search-params="searchParams" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const searchParams = ref<{ fieldQueries?: string; sort?: string }>()

function onSearch (params: { fieldQueries?: string; sort?: string }) {
  searchParams.value = params
}
</script>