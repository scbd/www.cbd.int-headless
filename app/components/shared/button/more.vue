<template>
  <NuxtLink :to="{ path: url }" :class="buttonProps.class" role="button">{{
    buttonProps.text
  }}</NuxtLink>
</template>
<script lang="ts" setup>
import { ContentName, ContentNames } from '~~/data/content-types';
const props = defineProps<{
  type: string;
  url: string;
  length: number;
}>();

const buttonProps = computed(() => {
  /**
   * TODO: handle aliases and pluralization of @items with i18n
   * eg. 'View Meetings and Voir les réunions' vs 'View Meeting and Voir la réunion'
   * TODO: handle button text with i18n
   * eg. item.text: t(`${props.type}.more`);
   */
  const single = {
    class: ['read-on'],
    text: `View ${ContentName[`${props.type}` as keyof typeof ContentName]}`,
  };

  const multiple = {
    class: ['btn', 'cbd-btn', 'cbd-btn-outline-more-content'],
    text: `More ${ContentNames[`${props.type}s` as keyof typeof ContentNames]}`,
  };

  return props.length === 1 ? single : multiple;
});
</script>
