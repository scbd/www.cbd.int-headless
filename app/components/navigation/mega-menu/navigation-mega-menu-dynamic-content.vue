<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      <span class="d-flex align-items-center gap-1">
        {{ toFormatDate(item.date) }}
        <span v-if="item.actionRequired" class="badge rounded-pill bg-danger ms-1">{{ t('actionRequired') }}</span>
      </span>

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

type ContentRow = Article | CalendarActivity | Decision | Meeting | Notification | PressRelease | Statement;

const props = defineProps<{
  component: string;
}>();

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const rows = await getContent(props.component)
const limit = 4
const items = (rows ?? []).map((row) => ({
  id: row.id,
  title: row.title,
  date: getDateProperty(row),
  url: getUrlProperty(row),
  actionRequired: getActionRequired(row)
}))

async function getContent(component: string) {
  switch (component) {
    case 'articles':             return (await useArticleListApi(ref({ limit }))).articles.value.rows;
    case 'calendar-activities':  return (await useCalendarActivitiesListApi(ref(getCalendarActivitiesOptions()))).calendarActivities.value.rows;
    case 'meetings':             return (await useMeetingsListApi(ref({ limit, sort: "query({!lucene v='endDate_dt:[NOW TO *]'}) DESC, endDate_dt ASC" }))).meetings.value.rows;
    case 'notifications':        return (await useNotificationsListApi(ref({ limit }))).notifications.value.rows;
    case 'statements':           return (await useStatementsListApi(ref({ limit }))).statements.value.rows;
    case 'decisions':            return (await useDecisionsApi({ limit })).decisions;
    case 'press-releases':       return (await usePressReleasesListApi(ref({ limit }))).pressReleases.value.rows;
    default:                     return [];
  }
}

function getCalendarActivitiesOptions() {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const startDate = `${twoDaysAgo.toISOString().split('T')[0]}T00:00:00Z`;
  const query = `startDateCOA_dt:[${startDate} TO *]`;

  return { limit, sort: 'actionRequiredByParties_b desc, startDateCOA_dt asc', query };
}

function getUrlProperty(row: ContentRow): string {
  if ('urls' in row && row.urls?.length > 0) return row.urls[0] ?? '#';
  if ('url' in row && row.url != null) return row.url;
  if ('alias' in row) return row.alias ?? '#';
  return '#';
}

function getDateProperty(row: ContentRow): Date {
  if ('startDate' in row && row.startDate != null) return row.startDate instanceof Date ? row.startDate : new Date(row.startDate);
  if ('startOn' in row && row.startOn !== undefined && row.startOn !== null) return row.startOn;
  if ('updatedOn' in row && row.updatedOn !== undefined && row.updatedOn !== null) return row.updatedOn;
  return row.createdOn;
}

function getActionRequired(row: ContentRow): boolean {
  return 'actionRequiredByParties' in row && (row as CalendarActivity).actionRequiredByParties === true;
}
</script>

<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/navigation-mega-menu-dynamic-content.json"></i18n>