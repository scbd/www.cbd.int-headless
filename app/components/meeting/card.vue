<template>
  <div class="content-object meeting">
    <div class="date">
      {{ formatDate(meeting.startOn) }}
      <template v-if="meeting.endOn">
        <span class="dash">&ndash;</span>
        {{ formatDate(meeting.endOn) }}
      </template>
    </div>

    <NuxtImg
      :src="meeting.imageUrl"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title">{{ getLocalizedText(meeting.title) }}</div>
    <div v-if="meeting.city || meeting.country" class="location">
      {{
        `${getLocalizedText(meeting.city)}, ${getLocalizedText(
          meeting.country
        )}`
      }}
    </div>
    <div class="read-on-wrapper">
      <NuxtLink :to="meeting.url" class="read-on">{{ t('viewMeeting') }}</NuxtLink>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/meeting/card.json"></i18n>

<script lang="ts" setup>
import type { Meeting } from '~~/types/meeting'
import { formatDate } from '~~/utils/date'
import { useLString } from '~~/utils/use-lstring'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t, locale } = useI18n()
const getLocalizedText = useLString(locale.value)

const props = defineProps<{
  meeting: Meeting
}>()

const meeting = computed(() => {
  return {
    ...props.meeting,
    url: props.meeting.urls[0],
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/meetings/${encodeURIComponent(
      props.meeting.code
    )}.jpg`
  }
})
</script>
