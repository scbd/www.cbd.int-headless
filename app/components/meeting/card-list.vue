<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
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
import { andOr, solrEscape } from '~~/utils/solr'
import useMeetingsListApi from '~/composables/api/use-meetings'
import { MEETINGS } from '~~/constants/url-paths'

const props = defineProps<{ tags?: string[] }>()

const { t } = useI18n()

const sort = 'endDate_dt ASC'
const fieldQueries = props.tags?.length
  ? andOr(props.tags.map(tag => `themes_ss:"${solrEscape(tag)}"`), 'OR')
  : undefined

const { meetings, error } = await useMeetingsListApi(ref({ limit: 4, sort, startDate: 'NOW', fieldQueries }))
</script>
