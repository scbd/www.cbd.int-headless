<template>
  <section
    class="content-row d-flex flex-column"
    :class="contentBlocks.classes"
  >
    <div class="row-title">
      {{ `${contentBlocks.type}s` }}
    </div>
    <div class="content-wrapper d-flex">
      <meeting-card
        v-for="meeting in contentBlocks.objects"
        :meeting="meeting"
      />
    </div>
    <shared-button-more
      :type="contentBlocks.type"
      :urls="[contentBlocks.path]"
    />
  </section>
</template>

<script lang="ts" setup>
import type { Meeting, MeetingList } from "~~/types/meeting";
import useMeetingsApi from "~/composables/api/use-meetings";

const { t } = useI18n();

const props = defineProps<{
  contentBlocksType:
    | "article"
    | "meeting"
    | "notification"
    | "statement"
    | "gbf-target"
    | "update";
}>();

const { getMeetings } = useMeetingsApi();
const contentBlockList: MeetingList = await getMeetings();

const { total, rows }: MeetingList = contentBlockList;

const contentBlocks = computed(() => {
  const classes: string[] = [];
  const styles: {
    [key: string]: string | number;
  } = {};
  let path = `/${props.contentBlocksType}s`;

  if (props.contentBlocksType !== "update") {
    classes.push(props.contentBlocksType);
  } else {
    classes.push("recent-updates");
  }

  return {
    objects: rows.slice(0, 4) as Meeting[],
    classes,
    styles,
    type: props.contentBlocksType,
    path,
  };
});
</script>
