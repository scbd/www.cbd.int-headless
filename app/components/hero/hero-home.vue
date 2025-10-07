<template>
  <div class="cus-hero">
    <template v-if="articleList.total === 1">
      <hero-content-single-feature :article="articleList.articles" />
    </template>
    <template v-else>
      <hero-content-multi-features :articles="articleList.articles" />
    </template>
  </div>
</template>

<script setup lang="ts">
import useContentApi from '~/composables/api/use-content-api';

const { t } = useI18n();

const { getArticles } = useContentApi();
const articles = await getArticles('-created');
const articleList = {
  articles: articles.slice(0, 3),
  total: articles.length,
};
</script>
