<template>
  <div class="read-on-wrapper">
    <NuxtLink :to="urls[0]" class="read-on">{{ `View ${type}s` }}</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  type: string;
  urls: string[];
}>();
</script>
