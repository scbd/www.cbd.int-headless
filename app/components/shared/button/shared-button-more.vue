<template>
  <NuxtLink
    :to="{ path: urls[0] }"
    class="btn cbd-btn cbd-btn-outline-more-content"
    role="button"
    >{{ `More ${type}s` }}</NuxtLink
  >
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: string;
  urls: string[];
}>();
</script>
