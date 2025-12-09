<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('notifications') }}
    </div>
    <div class="content-wrapper d-flex">
      <notification-card
        v-if="!isError"
        v-for="notification in items"
        :notification="notification"
        :key="notification.id"
      />
      <status v-else :error="isError" />
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
import useNotificationsApi from '~/composables/api/use-notifications';
import { NOTIFICATIONS } from '~~/constants/api-paths';

const { t } = useI18n();

const isError = ref<Error>();
const { getNotifications } = useNotificationsApi();
const { rows: items } = await getNotifications({ limit: 4 }).catch(
  (error: Error) => {
    isError.value = error;
    return { rows: [] };
  }
);
</script>
