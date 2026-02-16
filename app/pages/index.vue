<template>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <hero />
    <div class="cus-article container-xxl d-flex flex-column">
      <async-block>
        <meeting-card-list />
      </async-block>
      <async-block>
         <notification-card-list />
      </async-block>
      <async-block>
        <gbf-target-card-list />
      </async-block>
      <async-block>
        <statement-card-list />
      </async-block>
      <async-block>
        <portal-card-list portal="cbd-portals" />
      </async-block>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>
