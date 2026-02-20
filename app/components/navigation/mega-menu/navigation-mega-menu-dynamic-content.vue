<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      {{ toFormatDate(item.date) }}<br />
      {{ toLocaleText(item.title) }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import useArticleListApi from '~/composables/api/use-articles-api';
import useDecisionsApi from '~/composables/api/use-decisions';
import useMeetingsApi from '~/composables/api/use-meetings';
import useNotificationsApi from '~/composables/api/use-notifications';
import useStatementsApi from '~/composables/api/use-statements';
import { useLString } from '~/composables/use-lstring';
import { useFormatDate } from '~/composables/use-format-date'
import type { Article } from '~~/types/content';
import type { Decision } from '~~/types/decision';
import type { Meeting } from '~~/types/meeting';
import type { Notification } from '~~/types/notification';
import type { Statement } from '~~/types/statement';


const props = defineProps<{
  component: string;
}>();

const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const rows = await getContent(props.component)

const items = (rows ?? []).map((row) => ({
  id: row.id,
  title: row.title,
  date: getDateProperty(row),
  url: 'urls' in row ? row.urls?.[0] ?? '#' : row.alias ?? '#',  // TO-DO: standardize URL property across content types
}))

async function getContent(component: string) {
  switch (component) {
    case 'articles':       return (await useArticleListApi({ limit: 4 })).articles;
    case 'meetings':       return (await useMeetingsApi({ limit: 4 })).meetings;
    case 'notifications':  return (await useNotificationsApi({ limit: 4 })).notifications;
    case 'statements':     return (await useStatementsApi({ limit: 4 })).statements;
    case 'decisions':      return (await useDecisionsApi({ limit: 4 })).decisions;
    default:               return [];
  }
}

function getDateProperty(row: Article | Decision | Meeting | Notification | Statement): Date {
  if ('startOn' in row && row.startOn !== undefined && row.startOn !== null) return row.startOn;
  if ('updatedOn' in row && row.updatedOn !== undefined && row.updatedOn !== null) return row.updatedOn;
  return row.createdOn;
}
</script>