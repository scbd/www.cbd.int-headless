<template>
  <div class="content-object meeting">
    <div class="date">
      {{ toFormatDate(meeting.startOn) }}
      <template v-if="meeting.endOn">
        <span class="dash">&ndash;</span>
        {{ toFormatDate(meeting.endOn) }}
      </template>
    </div>

    <NuxtImg
      :src="meeting?.image?.path"
      :alt="meeting?.image?.alt"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title">{{ toLocaleText(meeting.title) }}</div>
    <div v-if="meeting.city || meeting.country" class="location">
      {{
        `${toLocaleText(meeting.city)}, ${toLocaleText(meeting.country)}`
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
import { useFormatDate } from '~/composables/use-format-date'
import { useLString } from '~/composables/use-lstring'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  meeting: Meeting
}>()

const meeting = computed(() => {
  return {
    ...props.meeting,
    url: props.meeting.urls[0],
  }
})
</script>
