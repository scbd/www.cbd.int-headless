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
import { ContentNames } from '~~/data/content-types';
import useMeetingsApi from '~/composables/api/use-meetings';

const { t, locale } = useI18n();

const props = defineProps<{
  type:
    | 'article'
    | 'meeting'
    | 'notification'
    | 'statement'
    | 'gbf-target'
    | 'update';
}>();

/**
 * TODO: make the result of @itemList generic based on @props.type
 * eg. if props.type === 'article' then itemList: ArticleList
 */
const { getMeetings } = useMeetingsApi();
const itemList: MeetingList = await getMeetings();

const { total, rows }: MeetingList = itemList;

const itemsProps = computed(() => {
  const classes: string[] = [];
  const styles: {
    [key: string]: string | number;
  } = {};

  /**
   * TODO: handle aliases and pluralization of @items with i18n
   * eg. t(`${props.type}.plural`);
   */
  let alias = ContentNames[`${props.type}s` as keyof typeof ContentNames];
  let path = `/${alias}`;

  if (props.type !== 'update') {
    classes.push(props.type);
  } else {
    classes.push('recent-updates');
  }

  return {
    items: rows.slice(0, 4),
    classes,
    styles,
    title: alias,
    type: props.type,
    path,
  };
});
</script>
