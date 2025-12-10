<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>
<i18n src="~~/i18n/dist/app/app.json"></i18n>

<script setup lang="ts">
const { locale, localeProperties, t } = useI18n();

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () =>  localeProperties.value.dir || 'ltr'
  },
  title: () => t('title'),
  meta: [
    {
      name: 'description',
      content: () => t('description')
    },
    {
      property: 'og:title',
      content: () => t('title')
    },
    {
      property: 'og:description',
      content: () => t('description')
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
