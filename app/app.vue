<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from '~/composables/i18n'
const pageTranslation = useTranslations('pages/index')

useSeoMeta({
  title: () => pageTranslation.t('title'),
  ogTitle: () => pageTranslation.t('title'),
  description: () => pageTranslation.t('description'),
  ogDescription: () => pageTranslation.t('description'),
});
</script>
