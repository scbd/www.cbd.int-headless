<template>
  <NuxtLink
    :to="{ path: url[0] }"
    class="btn cbd-btn cbd-btn-outline-more-content"
    role="button"
    >{{ more }}</NuxtLink
  >
</template>

<script lang="ts" setup>
import { ContentNames } from '~~/data/content-types';
const props = defineProps<{
  type: string;
  url: string[];
}>();

const more = `More ${
  ContentNames[`${props.type}s` as keyof typeof ContentNames]
}`;
const test = '';
</script>
