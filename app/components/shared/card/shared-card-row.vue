<template>
  <section
    class="content-row d-flex flex-column"
    :class="contentBlocks.classes"
  >
    <div class="row-title">
      {{ contentBlocks.title }}
    </div>
    <div class="content-wrapper d-flex">
      <meeting-card
        v-for="meeting in contentBlocks.objects"
        :meeting="meeting"
        :key="meeting.id"
      />
    </div>
    <shared-button-more :type="contentBlocks.type" :url="contentBlocks.path" />
  </section>
</template>

<script lang="ts" setup>
import type { Meeting, MeetingList } from '~~/types/meeting';
import { ContentNames } from '~~/data/content-types';
import useMeetingsApi from '~/composables/api/use-meetings';

const { t } = useI18n();

const props = defineProps<{
  type:
    | 'article'
    | 'meeting'
    | 'notification'
    | 'statement'
    | 'gbf-target'
    | 'update';
}>();

const { getMeetings } = useMeetingsApi();
const contentBlockList: MeetingList = await getMeetings();

const { total, rows }: MeetingList = contentBlockList;

const contentBlocks = computed(() => {
  const classes: string[] = [];
  const styles: {
    [key: string]: string | number;
  } = {};

  let alias = ContentNames[`${props.type}s` as keyof typeof ContentNames];
  let path = `/${alias}`;

  if (props.type !== 'update') {
    classes.push(props.type);
  } else {
    classes.push('recent-updates');
  }

  return {
    objects: rows.slice(0, 4) as Meeting[],
    classes,
    styles,
    title: alias,
    type: props.type,
    path,
  };
});
</script>
