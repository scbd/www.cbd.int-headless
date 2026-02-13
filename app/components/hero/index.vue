<template>
  <div class="cus-hero" :class="heroClasses">
    <status v-if="pending" />
    <status v-else-if="error" :error="error" />
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

<script setup lang="ts">
import useArticleListApi from '~/composables/api/use-articles-api'

const { articles, pending, error } = useArticleListApi({ limit: 3 })

const primaryArticle = computed(() => articles.value.at(0))
const secondaryArticles = computed(() => articles.value.slice(1))
const isMultiple = computed(() => secondaryArticles.value.length !== 0)
const heroClasses = computed(() =>
  isMultiple.value ? ['triple-features'] : ['']
)
</script>
