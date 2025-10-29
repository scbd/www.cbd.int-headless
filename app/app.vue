<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { loadTranslations } from "~/composables/i18n";
const { locale, t } = useI18n();

useSeoMeta({
  title: () => t("page.title"),
  ogTitle: () => t("page.title"),
  description: () => t("page.description"),
  ogDescription: () => t("page.description"),
});

onMounted(async () => {
  await loadTranslations("pages/index");
});

watch(locale, async () => {
  await loadTranslations("pages/index");
});
</script>
