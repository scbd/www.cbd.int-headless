<template>
  <NuxtLink to="/" class="navbar-brand">
    <NuxtImg
      class="cus-logo"
      :src="`/images/CBD-logo-EN.svg`"
      alt="Convention of Biological Diversity Logo"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
