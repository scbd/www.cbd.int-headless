<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from '~/composables/i18n'

const { locale, locales } = useI18n()
const pageTranslation = useTranslations('pages/index')

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () =>  locale.value === 'ar' ? 'rtl' : 'ltr'
  },
  title: () => pageTranslation.t('title'),
  meta: [
    {
      name: 'description',
      content: () => pageTranslation.t('description')
    },
    {
      property: 'og:title',
      content: () => pageTranslation.t('title')
    },
    {
      property: 'og:description',
      content: () => pageTranslation.t('description')
    },
    {
      property: 'og:image',
      content: () => 'https://www.cbd.int/images/cbd-social-card.png'
    },
    {
      property: 'og:twitterCard',
      content: 'summary_large_image'
    }
  ]
});
</script>
