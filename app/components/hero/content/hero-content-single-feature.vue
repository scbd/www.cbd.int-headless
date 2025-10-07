<template>
  <div v-for="article of article">{{ article.title }}</div>
</template>

<script setup lang="ts">
import type { Article } from '~~/types/content';

const props = defineProps<{
  article: Article[];
}>();
</script>
