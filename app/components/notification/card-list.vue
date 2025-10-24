<template>
  <section class="content-row d-flex flex-column" :class="itemsProps.classes">
    <div class="row-title">
      {{ t('notifications') }}
    </div>
    <div class="content-wrapper d-flex">
      <notification-card
        v-if="!itemsProps.isError"
        v-for="notification in itemsProps.items"
        :notification="notification"
        :key="notification.id"
      />
      <status v-else class="error-loader" />
    </div>
    <NuxtLink
      :to="itemsProps.path"
      class="btn cbd-btn cbd-btn-outline-more-content"
    >
      More notifications
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import type {
  Notification,
  NotificationList,
  NotificationOptions,
} from '~~/types/notification';
import useNotificationsApi from '~/composables/api/use-notifications';

const { t, locale } = useI18n();

const { getNotifications } = useNotificationsApi();
const options: NotificationOptions = { limit: 4 };
const { total, rows, isError } = await getNotifications(options);

const itemsProps = computed(() => {
  const classes: string[] = [];
  const styles: Record<string, string | number> = {};

  /**
   * TODO: handle aliases and pluralization of @items with i18n
   * eg. t(`${props.type}.plural`);
   */

  /**
   * TODO: replace itemProps.path with named route
   */

  return {
    items: rows,
    isError,
    classes,
    styles,
    path: '/notification',
  };
});
</script>
