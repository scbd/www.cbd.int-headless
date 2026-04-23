<template>
  <notification-content :code="code" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const route = useRoute()
const code = route.params.code as string
</script>