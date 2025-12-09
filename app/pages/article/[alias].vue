<template>
  <main class="cus-main cus-internal-page d-flex flex-column" role="main">
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
  </main>
</template>

<script setup lang="ts">
import useArticlesApi from '~/composables/api/use-articles-api'

const route = useRoute()
const { getArticle } = useArticlesApi()

const article = await getArticle(route.path).catch((error) => {
  throw error
})

definePageMeta({
  layout: 'home',
  breadcrumbs: true
})
</script>
