<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <article class="cus-article container-xxl d-flex flex-column">
      <shared-card-row type="meeting" />
    </article>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
});
</script>
