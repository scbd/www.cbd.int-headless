<template>
  <async-block>
    <article-search @search="onSearch" />
    <article-search-list :search-params="searchParams" />
  </async-block>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'home' })

const searchParams = ref<{ search?: string; sort?: string }>()

function onSearch (params: { search?: string; sort?: string }) {
  searchParams.value = params
}
</script>