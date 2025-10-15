<template>
  <div class="content-object" :class="meeting.type">
    <div class="date">
      {{ meeting.startOn }}
      <template v-if="meeting.endOn">
        <span class="dash">&ndash;</span> {{ meeting.endOn }}
      </template>
    </div>

    <img :src="meeting.image" @error="missingImageUrl" class="content-image" />

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
import { solrImageUrl, missingImageUrl } from '~~/utils/images';

const { t, locale } = useI18n();

const props = defineProps<{
  meeting: Meeting;
}>();

/**
 * TODO: Make composable for formateDate() to use locale internally
 * as mentioned here: https://github.com/scbd/www.cbd.int-headless/pull/10#discussion_r2432608355
 */

const meeting = {
  type: 'meeting',
  ...props.meeting,
  startOn: formatDate(props.meeting.startOn, locale.value),
  endOn: formatDate(props.meeting.endOn, locale.value),
  url: props.meeting.urls?.[0] || '#',
  image: solrImageUrl(props.meeting.urls?.[0] || ''),
};

console.log(meeting.image);

/**
 * TODO: Use LString for location (city, country) and title
 * as described in https://github.com/scbd/www.cbd.int-headless/pull/10#discussion_r2432554274
 */
</script>
