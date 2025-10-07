<template>
  <div v-for="article of articles">{{ article.title }}</div>
</template>

<script setup lang="ts">
import type { Article } from '~~/types/content';

const props = defineProps<{
  articles: Article[];
}>();
</script>
