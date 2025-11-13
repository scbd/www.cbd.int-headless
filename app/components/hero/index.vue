<template>
  <div class="cus-hero" :class="heroClasses">
    <div v-if="!isError">
      <div class="featured-items">
        <hero-content-featured-item
          :article="featuredArticles[0]!"
          :isPrimary="true"
          class="featured-primary"
        />
        <div v-show="!isSingleArticle" class="triple-ancilliary-wrapper">
          <hero-content-featured-item
            v-for="article in featuredArticles.slice(1)"
            :article="article"
            :key="article.title"
          />
        </div>
      </div>
    </div>
    <status v-else :error="isError" />
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~~/types/content'
import useArticlesApi from '~/composables/api/use-articles-api'

const isError = ref<Error>()

const { getArticles } = useArticlesApi()

const items = await getArticles({ limit: 3 }).catch((error) => {
  isError.value = error
  return []
})

const isSingleArticle = ref<boolean>(true)

const featuredArticles = computed(() => {
  const articles: Article[] = items.map((article) => ({
    ...article,
    coverImage: {
      ...article.coverImage,
      path: encodeURI(article.coverImage.path)
    }
  }))

  isSingleArticle.value = articles.length === 1

  return articles
})

const heroClasses = computed(() => {
  const classes: string[] = []

  if (items.length > 1) classes.push('triple-features')

  return classes
})
</script>
