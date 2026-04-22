<template>
  <main class="cus-main cus-internal-page d-flex flex-column" role="main">
    <status v-if="error" :error="error" />
    <template v-else-if="article">
      <!-- Breadcrumbs -->
      <hero-item-page :article="article" />
      <div class="container-xxl d-flex">
        <article class="cus-article container-fluid d-flex flex-column">
          <section
            v-dompurify-html="article.body"
            class="rendered-content"
          ></section>
        </article>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useArticles } from '~/composables/use-articles'

const route = useRoute()
const { getArticle } = useArticles()
const { data: article, error } = await getArticle(route.path)

definePageMeta({
  layout: 'home',
  breadcrumbs: true
})
</script>
