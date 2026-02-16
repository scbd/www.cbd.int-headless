<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <hero />
    <article class="cus-article container-xxl d-flex flex-column">
      <async-block>
        <lazy-meeting-card-list />
      </async-block>
      <notification-card-list />
      <gbf-target-card-list />
      <statement-card-list />
      <portal-card-list portal="cbd-portals" />
    </article>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>
