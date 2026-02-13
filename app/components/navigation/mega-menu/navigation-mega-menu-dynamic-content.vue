<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      {{ toFormatDate(item.date) }}<br />
      {{ toLocaleText(item.title) }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import useMeetingsApi from '~/composables/api/use-meetings';
import useNotificationsApi from '~/composables/api/use-notifications';
import useStatementsApi from '~/composables/api/use-statements';
import { useLString } from '~/composables/use-lstring';
import { useFormatDate } from '~/composables/use-format-date'
import type { Meeting } from '~~/types/meeting';
import type { Notification } from '~~/types/notification';
import type { Statement } from '~~/types/statement';

const props = defineProps<{
  component: string;
}>();

const { toLocaleText } = useLString();
const { toFormatDate } = useFormatDate()

function getContent(component: string) {
  switch (component) {
    case 'meetings':       return useMeetingsApi({ limit: 4 }).meetings;
    case 'notifications':  return useNotificationsApi({ limit: 4 }).notifications;
    case 'statements':     return useStatementsApi({ limit: 4 }).statements;
  }
}

function getDateProperty(row: Meeting | Notification | Statement): Date {
  if ('startOn' in row && row.startOn !== undefined && row.startOn !== null) return row.startOn;
  if ('updatedOn' in row && row.updatedOn !== undefined && row.updatedOn !== null) return row.updatedOn;
  return row.createdOn;
}

const rows = getContent(props.component);

const items = computed(() =>
  (rows?.value ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    date: getDateProperty(row),
    url: row.urls?.[0] ?? '#',
  }))
);
</script>
