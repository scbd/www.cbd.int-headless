<template>
  <div class="content-object notification">
    <div class="date">
      {{ toFormatDate(notification.createdOn) }}
    </div>

    <NuxtImg
      :src="notification.imageUrl"
      alt=""
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title"
      >{{ notification.code }} &ndash;
      {{ toLocaleText(notification.title) }}</div
    >

    <div v-if="notification.actionOn" class="action-required">
      {{ t('actionRequired') }}: {{ toFormatDate(notification.actionOn) }}
    </div>

    <div class="subjects">
      {{ t('subjects') }}:
      <template v-for="theme of notification.themes">
        {{ toLocaleText(theme) }}
      </template>
    </div>

    <div
      v-dompurify-html:plaintext="toLocaleText(notification.fulltext)"
      class="description"
    ></div>

    <div class="read-on-wrapper">
      <NuxtLink :to="notification.url" class="read-on"
        >{{ t('viewNotification') }}</NuxtLink
      >
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/notification/card.json"></i18n>

<script lang="ts" setup>
import type { Notification } from '~~/types/notification'
import { useFormatDate } from '~/composables/use-format-date'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  notification: Notification
}>()

const notification = computed(() => {
  return {
    ...props.notification,
    url: props.notification.urls[0],
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/notifications/${encodeURIComponent(
      props.notification.code
    )}.jpg`
  }
})
</script>
