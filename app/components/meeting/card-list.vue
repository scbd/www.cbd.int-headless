<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="pending || error" :error="error" />
      <meeting-card
        v-else
        v-for="meeting in meetings.rows"
        :meeting="meeting"
        :key="meeting.id"
      />
    </div>
    <NuxtLink :to="MEETINGS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreMeetings') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/meeting/card-list.json"></i18n>

<script lang="ts" setup>
import { MEETINGS } from '~~/constants/url-paths'

const { t } = useI18n()
const { getMeetingList } = useMeetings()

const sort = 'endDate_dt ASC'
const { data: meetings, pending, error } = getMeetingList(ref({ limit: 4, sort, startDate: 'NOW' }))
</script>
