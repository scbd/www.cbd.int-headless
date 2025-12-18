<template>
  <NuxtLink to="/" class="navbar-brand">
    <NuxtImg
      class="cus-logo"
      :src="cbdLogoUrl"
      :alt="t('conventionBiologicalDiversityLogo')"
    />
  </NuxtLink>
</template>
<i18n
  src="~~/i18n/dist/app/components/navigation/navigation-branding.json"
></i18n>

<script setup lang="ts">
const { t, locale } = useI18n()

const cbdLogoUrl = computed(
  () => `/images/cbd-logo-${encodeURIComponent(locale.value)}.svg`
)
</script>
