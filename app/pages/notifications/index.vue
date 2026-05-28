<template>
  <async-block>
    <notification-search @search="onSearch" />
    <notification-search-list :search-params="searchParams" />
  </async-block>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const searchParams = ref<{ fieldQueries?: string; startDate?: string; endDate?: string; themes?: string; }>()

function onSearch (params: { fieldQueries?: string; startDate?: string; endDate?: string; themes?: string }) {
  searchParams.value = params
}
</script>