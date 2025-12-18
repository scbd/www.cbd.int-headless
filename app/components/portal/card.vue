<template>
  <div class="content-object portal">
    <NuxtImg :src="portal.imageUrl" class="content-image" loading="lazy" />
    <div class="title">{{ portal.title }}</div>
    <div class="read-on-wrapper">
      <NuxtLink :to="portal.url" class="read-on">{{
        t('viewPortal')
      }}</NuxtLink>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/portal/card.json"></i18n>

<script lang="ts" setup>
import type { Portal } from '~~/types/portal';
import { IMAGE_FALLBACK } from '~~/constants/image-paths';

const { t } = useI18n()

const props = defineProps<{
  portal: Portal
}>()

const portal = computed(() => {
  return {
    ...props.portal,
    imageUrl: props.portal.icon
      ? `/images/${encodeURIComponent(props.portal.icon)}`
      : IMAGE_FALLBACK
  }
})
</script>
