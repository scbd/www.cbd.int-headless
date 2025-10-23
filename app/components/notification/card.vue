<template>
  <div class="content-object" :class="notification.type">
    <div class="date">
      {{ notification.createdOn }}
    </div>

    <NuxtImg
      v-if="!isError"
      :src="notification.image"
      alt=""
      class="content-image"
      loading="lazy"
      :custom="true"
      provider="drupal"
      @error="isError = true"
      v-slot="{ src, imgAttrs, isLoaded }"
    >
      <img v-if="isLoaded" :src="src" v-bind="imgAttrs" data-cbd="cool" />
    </NuxtImg>

    <NuxtImg
      v-else
      :src="notification.imageFallBack"
      alt=""
      class="content-image"
      role="img"
    />

    <div class="title">{{ notification.fullTitle }}</div>

    <div v-show="notification.actionOn" class="action-required">
      Action required: {{ notification.actionOn }}
    </div>

    <div v-if="notification.themes?.[locale]" class="subjects">
      Subjects: {{ notification.themes[locale] }}
    </div>

    <div v-html="notification.fulltext[locale]" class="description"></div>

    <div class="read-on-wrapper">
      <NuxtLink :to="notification.url" class="read-on"
        >View notification</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Notification } from '~~/types/notification';
import { formatDate } from '~~/utils/date';

const { t, locale } = useI18n();

const props = defineProps<{
  notification: Notification;
}>();

/**
 * TODO: Make composable for formateDate() to use locale internally
 * as mentioned here: https://github.com/scbd/www.cbd.int-headless/pull/10#discussion_r2432608355
 */

/**
 * TODO: https://scbd.atlassian.net/browse/CIR-140
 * Add LString composable to manage LString values/properties
 *
 */

const notification = computed(() => {
  return {
    type: 'notification',
    ...props.notification,
    fullTitle: `${props.notification.code} - ${
      props.notification.title[locale.value]
    }`,
    themes: props.notification.themes.find((l) => l[locale.value]),
    createdOn: formatDate(props.notification.createdOn, locale.value),
    endOn: formatDate(props.notification.endOn, locale.value),
    actionOn: formatDate(props.notification.actionOn, locale.value),
    deadlineOn: formatDate(props.notification.deadlineOn, locale.value),
    url: props.notification.urls?.[0] || '#',
    image: `/notifications/${props.notification.code}.jpg`,
    imageFallBack: '/images/content-replacement.svg',
  };
});

const isError = ref<boolean>(false);

const handleImageError = () => {
  isError.value = true;
};

/**
 * TODO: Use LString for location (city, country) and title
 * as described in https://github.com/scbd/www.cbd.int-headless/pull/10#discussion_r2432554274
 */
</script>
