<template>
  <div class="cus-hero">ya</div>
</template>

<script setup lang="ts">
import useContentApi from '~/composables/api/use-content-api';

const { t } = useI18n();

const { getArticle } = useContentApi();
const article = await getArticle('/article/Publication-Guide-to-Cali-Fund/');

console.log(article);
</script>
