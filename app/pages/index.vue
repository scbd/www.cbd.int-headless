<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
      <hero />
    <div class="cus-article container-xxl d-flex flex-column">
        <recent-update-card-list />
        <meeting-card-list />
         <notification-card-list />
        <gbf-target-card-list />
        <statement-card-list />
        <portal-card-list portal="cbd-portals" />
        <nbsap-card-list />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>
