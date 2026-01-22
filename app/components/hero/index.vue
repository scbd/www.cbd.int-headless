<template>
  <div class="cus-hero" :class="heroClasses">
    <!-- <div v-if="!error" class="featured-items"> // TO-DO: to be fixed with CIR-234 -->
      <div class="featured-items">
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
    <!-- <status v-else :error="error" /> // TO-DO: to be fixed with CIR-234 -->
  </div>
</template>

<script setup lang="ts">
import useArticlesApi from '~/composables/api/use-articles-api'

// const error = ref<Error>() // TO-DO: to be fixed with CIR-234

const { listArticles } = useArticlesApi()

const items = await listArticles({ limit: 3 })

const primaryArticle = computed(() => items.at(0))
const secondaryArticles = computed(() => items.slice(1))
const isMultiple = computed(() => secondaryArticles.value.length !== 0)
const heroClasses = computed(() =>
  isMultiple.value ? ['triple-features'] : ['']
)
</script>
