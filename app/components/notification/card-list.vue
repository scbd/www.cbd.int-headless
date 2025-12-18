<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('notifications') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
      <notification-card
        v-else
        v-for="notification in items"
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
import type { NuxtError } from '#app'
import useNotificationsApi from '~/composables/api/use-notifications-api'
import { NOTIFICATIONS } from '~~/constants/api-paths'

const { t } = useI18n()

const error = ref<NuxtError>()
const { getNotifications } = useNotificationsApi()
const { rows: items } = await getNotifications({ limit: 4 }).catch(
  (nuxtError: NuxtError) => {
    error.value = nuxtError
    return { rows: [] }
  }
)
</script>
