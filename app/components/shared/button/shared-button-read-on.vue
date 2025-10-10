<template>
  <div class="read-on-wrapper">
    <NuxtLink :to="url" class="read-on">{{ more }}</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import { ContentNames } from '~~/data/content-types';
const props = defineProps<{
  type: string;
  url: string;
}>();

const more = `View ${
  ContentNames[`${props.type}` as keyof typeof ContentNames]
}`;
</script>
