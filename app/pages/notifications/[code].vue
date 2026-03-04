<template>
  <async-block>
    <notification-content :code="code" />
  </async-block>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const route = useRoute()
const code = route.params.code as string
</script>