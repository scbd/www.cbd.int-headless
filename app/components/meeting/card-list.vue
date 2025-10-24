<template>
  <section class="content-row d-flex flex-column" :class="itemsProps.classes">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <meeting-card
        v-if="!itemsProps.isError"
        v-for="meeting in itemsProps.items"
        :meeting="meeting"
        :key="meeting.id"
      />
      <status v-else class="error-loader" />
    </div>
    <NuxtLink
      :to="itemsProps.path"
      class="btn cbd-btn cbd-btn-outline-more-content"
    >
      More meetings
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting';
import useMeetingsApi from '~/composables/api/use-meetings';

const { t, locale } = useI18n();

const { getMeetings } = useMeetingsApi();
const options: MeetingOptions = { limit: 4 };
const { total, rows, isError } = await getMeetings(options);

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
    path: '/meeting',
  };
});
</script>
