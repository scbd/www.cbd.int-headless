<template>
  <div class="content-object" :class="meeting.type">
    <div class="date">
      {{ meeting.startOn }}
      <template v-if="meeting.endOn">
        <span class="dash">&ndash;</span> {{ meeting.endOn }}
      </template>
    </div>
    <div class="title">{{ meeting.title[locale] }}</div>
    <div v-show="meeting.city || meeting.country" class="location">
      {{ `${meeting.city[locale]}, ${meeting.country[locale]}` }}
    </div>
    <shared-button-read-on :url="meeting.url" :type="meeting.type" />
  </div>
</template>

<script lang="ts" setup>
import type { Meeting } from '~~/types/meeting';
import { formatDate } from '~~/utils/date';

const { t, locale } = useI18n();

const props = defineProps<{
  meeting: Meeting;
}>();

const meeting = {
  type: 'meeting',
  ...props.meeting,
  startOn: formatDate(props.meeting.startOn, locale.value),
  endOn: formatDate(props.meeting.endOn, locale.value),
  url: props.meeting.urls[0]!,
};
</script>
