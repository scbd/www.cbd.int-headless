<template>
  <div class="featured-item accent-cbd">
    <img
      :src="article.coverImage.path"
      :alt="article.coverImage.alt"
      class="featured-cover-image"
    />
    <NuxtLink :to="article.alias" class="featured-wrapper">
      <div class="featured-information">
        <div class="featured-taxonomy">
          <div class="featured-source">{{ t('cbd') }}</div>
          <div class="featured-type">{{ article.bundle }}</div>
        </div>
        <div class="featured-description">{{ article.title }}</div>
      </div>
      <div v-if="isPrimary" class="featured-buttons container-field">
        <button class="btn cbd-btn cbd-btn-primary btn-lg">{{ t('viewArticle') }}</button>
      </div>
    </NuxtLink>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/hero/content/featured-item.json"></i18n>

<script setup lang="ts">
import type { Article } from '~~/types/content'

const { t } = useI18n()

const props = defineProps<{
  article: Article
  isPrimary?: boolean
}>()
</script>
