<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <article class="cus-article container-xxl d-flex flex-column">
      <meeting-card-list />
      <notification-card-list />
      <statement-card-list />
      <portal-card-list portals="cbd-portals" />
    </article>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
});
</script>
