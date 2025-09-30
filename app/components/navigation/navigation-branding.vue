<template>
  <NuxtLink to="/" class="navbar-brand">
    <NuxtImg
      class="cus-logo"
      :src="cbdLogoUrl"
      alt="Convention of Biological Diversity Logo"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const cbdLogoUrl = computed(
  () => `/images/cbd-logo-${encodeURIComponent(locale.value)}.svg`
);
</script>
