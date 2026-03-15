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
import useCalendarActivitiesListApi from '~/composables/api/use-calendar-activities';
import useDecisionsApi from '~/composables/api/use-decisions';
import useMeetingsListApi from '~/composables/api/use-meetings';
import useNotificationsListApi from '~/composables/api/use-notifications';
import useStatementsListApi from '~/composables/api/use-statements';
import usePressReleasesListApi from '~/composables/api/use-press-releases';
import { useLString } from '~/composables/use-lstring';
import { useFormatDate } from '~/composables/use-format-date'
import type { Article } from '~~/types/content';
import type { CalendarActivity } from '~~/types/calendar-activity';
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

const rows = await getContent(props.component)

const items = (rows ?? []).map((row) => ({
  id: row.id,
  title: row.title,
  date: getDateProperty(row),
  url: getUrlProperty(row)
}))

// TO-DO: articles/meetings/statements and decisions will follow the same new pattern as notifications on their respective PRs.
async function getContent(component: string) {
  switch (component) {
    case 'articles':              return (await useArticleListApi(ref({ limit: 4 }))).articles.value.rows;
    case 'calendar-activities':   return (await useCalendarActivitiesListApi(ref({ limit: 4, sort: 'startDate_dt asc' }))).calendarActivities.value.rows;
    case 'meetings':              return (await useMeetingsListApi(ref({ limit: 4 }))).meetings.value.rows;
    case 'notifications':         return (await useNotificationsListApi(ref({ limit: 4 }))).notifications.value.rows;
    case 'statements':            return (await useStatementsListApi(ref({ limit: 4 })) ).statements.value.rows;
    case 'decisions':             return (await useDecisionsApi({ limit: 4 })).decisions;
    case 'press-releases':        return (await usePressReleasesListApi(ref({ limit: 4 }))).pressReleases.value.rows;
    default:                      return [];
  }
}

function getUrlProperty(row: Article | CalendarActivity | Decision | Meeting | Notification | PressRelease | Statement): string {
  if ('urls' in row && row.urls?.length > 0) return row.urls[0] ?? '#';
  if ('url' in row && row.url != null) return row.url;
  if ('alias' in row) return row.alias ?? '#';
  return '#';
}

function getDateProperty(row: Article | CalendarActivity | Decision | Meeting | Notification | PressRelease | Statement): Date {
  if ('startDate' in row && row.startDate != null) return row.startDate instanceof Date ? row.startDate : new Date(row.startDate);
  if ('startOn' in row && row.startOn !== undefined && row.startOn !== null) return row.startOn;
  if ('updatedOn' in row && row.updatedOn !== undefined && row.updatedOn !== null) return row.updatedOn;
  return row.createdOn;
}
</script>