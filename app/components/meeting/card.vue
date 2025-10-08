<template>
  <div class="content-object" :class="meeting.type">
    <div class="date">
      {{ meeting.startOnString }}
      <template v-if="meeting.endOn">
        &nbsp;&ndash;&nbsp;
        {{ meeting.endOnString }}
      </template>
    </div>
    <div class="title">{{ meeting.title[locale] }}</div>
    <!-- TODO: Create a util to format location based on locale -->
    <div v-show="meeting.city || meeting.country" class="location">
      {{ `${meeting.city[locale]}, ${meeting.country[locale]}` }}
    </div>
    <shared-button-read-on :urls="meeting.urls" :type="meeting.type" />
  </div>
</template>

<script lang="ts" setup>
import type { Meeting } from '~~/types/meeting';

const { t, locale } = useI18n();

const props = defineProps<{
  meeting: Meeting;
}>();

const meeting = {
  type: 'meeting',
  ...props.meeting,
  startOnString: Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(props.meeting.startOn)),
  endOnString: props.meeting.endOn
    ? Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(props.meeting.endOn))
    : null,
};
</script>
