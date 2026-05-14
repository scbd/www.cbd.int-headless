<template>
  <section v-if="error || notifications.rows?.length" class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('notifications') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
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
import { solrEscape } from '~~/utils/solr'
import useNotificationsListApi from '~/composables/api/use-notifications'
import { NOTIFICATIONS } from '~~/constants/url-paths'

const props = defineProps<{ tags?: string[] }>()

const { t } = useI18n()

const fieldQueries = props.tags?.length
  ? `themes_ss:(${props.tags.map(tag => `"${solrEscape(tag)}"`).join(' ')})`
  : undefined

const { notifications, error } = await useNotificationsListApi(ref({ limit: 4, fieldQueries }))
</script>
