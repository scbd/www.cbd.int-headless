<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('notifications') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="pending || error" :error="error" />
      <notification-card
        v-else
        v-for="notification in notifications.rows"
        :notification="notification"
        :key="notification.id"
      />
    </div>
    <NuxtLink
      :to="NOTIFICATIONS"
      class="btn cbd-btn cbd-btn-outline-more-content"
    >
      {{ t('moreNotifications') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/notification/card-list.json"></i18n>

<script lang="ts" setup>
import { NOTIFICATIONS } from '~~/constants/url-paths'

const { t } = useI18n()

const { getNotificationList } = useNotifications()

const { data: notifications, pending, error } = await getNotificationList({ limit: 4 })
</script>
