<template>
  <section class="content-row d-flex flex-column" :class="itemsProps.classes">
    <div class="row-title">
      {{ itemsProps.title }}
    </div>
    <div class="content-wrapper d-flex">
      <meeting-card
        v-for="meeting in itemsProps.items"
        :meeting="meeting"
        :key="meeting.id"
      />
    </div>
    <shared-button-more
      :type="itemsProps.type"
      :url="itemsProps.path"
      :length="itemsProps.items.length"
    />
  </section>
</template>

<script lang="ts" setup>
import type { Meeting, MeetingList } from '~~/types/meeting';
import useMeetingsApi from '~/composables/api/use-meetings';

const { t, locale } = useI18n();

const { getMeetings } = useMeetingsApi();
const { total, rows }: MeetingList = await getMeetings();

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
    items: rows.slice(0, 4),
    classes,
    styles,
    title: 'meetings',
    type: 'meeting',
    path: '/meeting',
  };
});
</script>
