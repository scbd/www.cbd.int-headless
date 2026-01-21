<template>
  <div class="cus-hero hero-content-page">
    <div class="featured-item">
      <img
        :src="article.coverImage.path"
        :alt="article.coverImage.alt"
        class="featured-cover-image"
      />
      <div class="featured-wrapper">
        <h1 class="featured-information">{{ article.title }}</h1>
        {{ article.coverImage.path }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~~/types/content'
import type { NuxtError } from '#app'

const props = defineProps<{
  article: Article
  error?: NuxtError
}>()
</script>
