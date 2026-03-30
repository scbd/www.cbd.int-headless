<template>
  <async-block>
    <decision-list :code="code"/>
  </async-block>
</template>

<script setup lang="ts">
import { DECISION } from '~~/constants/decisions'

definePageMeta({
  layout: 'home'
})

const route = useRoute()
const code = route.params.code as string

if (!DECISION[code.toUpperCase() as keyof typeof DECISION]) {
  throw createError({ statusCode: 404, statusMessage: `Decisions for '${code}' not found.` })
}
</script>