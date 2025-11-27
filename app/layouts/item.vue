<template>
    <div class="body-replace">
    <layout-shared-header>
      <navigation-mega-menu />
    </layout-shared-header>    
    <!-- <layout-shared-breadcrumbs v-if="route.page.meta.breadcrumbs === true" /> -->    
    <!-- Main -->
    <NuxtPage :page-key="(route) => route.fullPath" />
    <layout-shared-footer />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>