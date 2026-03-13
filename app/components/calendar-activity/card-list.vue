<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">{{ t('calendarActivities') }}</div>
    <div class="content-wrapper d-flex flex-column">
      <status v-if="error" :error="error" />
      <template v-else>
        <calendar-activity-card
          v-for="doc in calendarActivities.docs"
          :key="doc.id"
          :doc="doc"
        />
      </template>
    </div>
    <NuxtLink
      :to="CALENDAR_OF_ACTIVITIES"
      class="btn cbd-btn cbd-btn-outline-more-content"
    >
      {{ t('moreActivities') }}
    </NuxtLink>
  </section>
</template>

<i18n src="~~/i18n/dist/app/components/calendar-activity/card-list.json"></i18n>

<script lang="ts" setup>
import { useCalendarActivitiesListApi } from '~/composables/api/use-calendar-activities';
import { CALENDAR_OF_ACTIVITIES } from '~~/constants/url-paths';

const { t } = useI18n();

const { calendarActivities, error } = await useCalendarActivitiesListApi();
</script>
