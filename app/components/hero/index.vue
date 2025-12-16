<template>
  <div class="cus-hero" :class="heroClasses">
    <status v-if="error" :error="error" />
    <div v-else class="featured-items">
      <hero-content-featured-item
        v-if="primaryArticle"
        :article="primaryArticle"
        :is-primary="true"
        class="featured-primary"
      />
      <div v-if="isMultiple" class="triple-ancilliary-wrapper">
        <hero-content-featured-item
          v-for="article in secondaryArticles"
          :article="article"
          :key="article.title"
        />
      </div>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/hero/index.json"></i18n>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
import useArticlesApi from '~/composables/api/use-articles-api'

const error = ref<NuxtError>()

const { getArticles } = useArticlesApi()

const items = await getArticles({ limit: 3 }).catch((nuxtError: NuxtError) => {
  error.value = nuxtError
  return []
})

const primaryArticle = computed(() => items.at(0))
const secondaryArticles = computed(() => items.slice(1))
const isMultiple = computed(() => secondaryArticles.value.length !== 0)
const heroClasses = computed(() =>
  isMultiple.value ? ['triple-features'] : ['']
)
</script>
