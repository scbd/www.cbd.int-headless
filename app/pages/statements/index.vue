<template>
  <async-block>
    <statement-search @search="onSearch" />
    <statement-search-list :search-params="searchParams" />
  </async-block>
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