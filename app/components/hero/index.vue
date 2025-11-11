<template>
  <div class="cus-hero" :class="heroClasses">
    <div v-if="isError === undefined">
      <template v-if="featuredArticles.total === 1">
        <hero-content-featured-item :articles="featuredArticles.primary" />
      </template>
      <template v-else>
        <div class="featured-items">
          <hero-content-featured-item :articles="featuredArticles.primary" />
          <div class="triple-ancilliary-wrapper">
            <hero-content-featured-item
              :articles="featuredArticles.ancilliary"
            />
          </div>
        </div>
      </template>
    </div>
    <status v-else :error="isError" />
  </div>
</template>

<script setup lang="ts">
import type { Article } from "~~/types/content";
import useArticlesApi from "~/composables/api/use-articles-api";
import { drupalImagePathNormalizer } from "~~/utils/drupal";

const isError = ref<Error>();
const { getArticles } = useArticlesApi();
const items = await getArticles({ limit: 3 }).catch((error) => {
  isError.value = error;
  return [];
});

const featuredArticles = computed(() => {
  const articles: (Article & { primary: boolean })[] = items.map(
    (article, index) => {
      return {
        ...article,
        coverImage: {
          ...article.coverImage,
          path: encodeURI(drupalImagePathNormalizer(article.coverImage.path)),
        },
        primary: index === 0,
      };
    }
  );
  return {
    total: items.length,
    primary: articles.slice(0, 1),
    ancilliary: articles.slice(1),
  };
});

const heroClasses = computed(() => {
  const classes: string[] = [];

  if (items.length > 1) classes.push("triple-features");

  return classes;
});
</script>
