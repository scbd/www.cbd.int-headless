<template>
  <main class="cus-main cus-internal-page d-flex flex-column" role="main">
    <status v-if="isLoading" />
    <status v-else-if="error" :error="error" />
    <template v-else>
      <!-- Breadcrumbs -->
      <hero-item-page :article="article!" />
      <div class="container-xxl d-flex">
        <article class="cus-article container-fluid d-flex flex-column">
          <section
            v-dompurify-html="article!.body"
            class="rendered-content"
          ></section>
        </article>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useArticleApi } from '~/composables/api/use-articles-api'

const route = useRoute()
const { article, pending: isLoading, error } = useArticleApi(route.path)

definePageMeta({
  layout: 'home',
  breadcrumbs: true
})
</script>
