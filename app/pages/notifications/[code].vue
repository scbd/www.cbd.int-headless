<template>
  <async-block>
    <notification-content :code="code" />
  </async-block>
</template>

<script setup lang="ts">
const route = useRoute()
const code = route.params.code as string

definePageMeta({
  layout: 'home'
})
</script>
