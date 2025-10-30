<template>
  <div class="content-object meeting">
    <div class="date">
      {{ meeting.startOn }}
      <template v-if="meeting.endOn">
        <span class="dash">&ndash;</span> {{ meeting.endOn }}
      </template>
    </div>

    <NuxtImg
      :src="meeting.imageUrl"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title">{{ meeting.title[locale] }}</div>
    <div v-show="meeting.city || meeting.country" class="location">
      {{ `${meeting.city[locale]}, ${meeting.country[locale]}` }}
    </div>
    <div class="read-on-wrapper">
      <NuxtLink :to="meeting.url" class="read-on">View meeting</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Meeting } from '~~/types/meeting';
import { formatDate } from '~~/utils/date';
import { IMAGE_FALLBACK } from '~~/constants/image-paths';

const { t, locale } = useI18n();

const props = defineProps<{
  meeting: Meeting;
}>();

const meeting = computed(() => {
  return {
    ...props.meeting,
    startOn: formatDate(props.meeting.startOn, locale.value),
    endOn: props.meeting.endOn
      ? formatDate(props.meeting.endOn, locale.value)
      : props.meeting.endOn,
    url: props.meeting.urls[0] ?? '#',
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/notifications/${encodeURIComponent(
      props.meeting.code
    )}.jpg`
  };
});
</script>
