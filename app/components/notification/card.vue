<template>
  <div class="content-object notification">
    <div class="date">
      {{ notification.createdOn }}
    </div>

    <NuxtImg
      :src="notification.imageUrl"
      alt=""
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title">{{ notification.fullTitle }}</div>

    <div v-show="notification.actionOn" class="action-required">
      Action required: {{ notification.actionOn }}
    </div>

    <div v-show="notification.themes" class="subjects">
      Subjects: {{ notification.themes }}
    </div>

    <div
      v-dompurify-html:plaintext="notification.fulltext[locale]"
      class="description"
    ></div>

    <div class="read-on-wrapper">
      <NuxtLink :to="{name: `notifications-code___${locale}`, params: { code: notification.code } }" class="read-on"
        >View notification</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Notification } from '~~/types/notification';
import { formatDate } from '~~/utils/date';
import { IMAGE_FALLBACK } from '~~/constants/image-paths';

const { t, locale } = useI18n();

const props = defineProps<{
  notification: Notification;
}>();

const notification = computed(() => {
  const themes: string[] = []
    props.notification.themes.map((l) => {
        const theme = l[locale.value]
        if (theme) themes.push(theme)
    })
  
  return {
    ...props.notification,
    fullTitle: `${props.notification.code} - ${
      props.notification.title[locale.value]
    }`,
    themes: themes.join(', '),
    createdOn: formatDate(props.notification.createdOn, locale.value),
    actionOn: props.notification.actionOn
      ? formatDate(props.notification.actionOn, locale.value)
      : props.notification.actionOn,
    url: props.notification.urls[0] ?? '#',
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/notifications/${encodeURIComponent(
      props.notification.code
    )}.jpg`
  };
});
</script>
