<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("page.title"),
  ogTitle: () => t("page.title"),
  description: () => t("page.description"),
  ogDescription: () => t("page.description"),
});
</script>
