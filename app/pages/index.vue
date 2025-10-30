<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <article class="cus-article container-xxl d-flex flex-column">
      <meeting-card-list />
      <notification-card-list />
    </article>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
});
</script>
