<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      {{ toFormatDate(item.date) }}<br />
      {{ toLocaleText(item.title) }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { getArticleList } from '~/composables/api/use-articles';
import { getDecisionList } from '~/composables/api/use-decisions';
import { getMeetingList } from '~/composables/api/use-meetings';
import { getNotificationList } from '~/composables/api/use-notifications';
import { getStatementList } from '~/composables/api/use-statements';
import { getPressReleaseList } from '~/composables/api/use-press-releases';
import { useLString } from '~/composables/use-lstring';
import { useFormatDate } from '~/composables/use-format-date'
import type { Article } from '~~/types/content';
import type { Decision } from '~~/types/decision';
import type { Meeting } from '~~/types/meeting';
import type { Notification } from '~~/types/notification';
import type { PressRelease } from '~~/types/press-release';
import type { Statement } from '~~/types/statement';


const props = defineProps<{
  component: string;
}>();

const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const asyncData = getContent(props.component)

const items = computed(() => {
  const rows = (asyncData?.data.value?.rows ?? []) as (Article | Decision | Meeting | Notification | PressRelease | Statement)[]
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: getDateProperty(row),
    url: 'urls' in row ? row.urls?.[0] ?? '#' : row.alias ?? '#',  // TO-DO: standardize URL property across content types
  }))
})

function getContent(component: string) {
  switch (component) {
    case 'articles':       return getArticleList({ limit: 4 })
    case 'meetings':       return getMeetingList({ limit: 4, sort: 'endDate_dt ASC', startDate: 'NOW' })
    case 'notifications':  return getNotificationList({ limit: 4 })
    case 'statements':     return getStatementList({ limit: 4 })
    case 'decisions':      return getDecisionList({ limit: 4 })
    case 'press-releases': return getPressReleaseList({ limit: 4 })
    default:               return null
  }
}

function getDateProperty(row: Article | Decision | Meeting | Notification | PressRelease | Statement): Date {
  if ('startOn' in row && row.startOn !== undefined && row.startOn !== null) return row.startOn;
  if ('updatedOn' in row && row.updatedOn !== undefined && row.updatedOn !== null) return row.updatedOn;
  return row.createdOn;
}
</script>