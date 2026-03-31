<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <h1>{{ t('title_' + code.toLowerCase()) }}</h1>

    <status v-if="error" :error="error" />
    <div v-else class="cus-serp">
      <!-- Top pagination -->
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingItems', { startItem, endItem, total: meetings.total }) }}
        </div>
        <search-pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="goToPage"
        />
      </div>

      <!-- Results -->
      <div class="search-results-items">
        <div v-for="meeting in meetings.rows" :key="meeting.id" class="search-item content-object">
          <div class="content-information-wrapper">
            <div class="information">
              <h2 class="title-heading">
                <NuxtLink :to="`/decisions/${code}/${meeting.code}`">
                  {{ toLocaleText(meeting.title) }}
                </NuxtLink>
              </h2>
              <div class="date">
                {{ toFormatDate(meeting.startOn) }} - {{ toFormatDate(meeting.endOn) }}
              </div>
              <div class="location" v-if="meeting.city?.en === 'Online'">
                {{ toLocaleText(meeting.city) }}
              </div>
              <div class="location" v-else-if="meeting.country?.en">
                {{ toLocaleText(meeting.city) }}, {{ toLocaleText(meeting.country) }}
              </div>
              <div class="read-on-wrapper gap-2">
                <NuxtLink
                  :to="`/decisions/${code}/${meeting.code}`"
                  class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on"
                >
                  {{ t('readDecisions') }}
                </NuxtLink>
                <a
                  v-if="dttMap[meeting.code]"
                  :href="getDttUrl(meeting.code)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn cbd-btn cbd-btn-outline-more-content"
                >
                  {{ t('dtt') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom pagination -->
      <search-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="goToPage"
      />
    </div>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/decision/list.json"></i18n>

<script setup lang="ts">
import useMeetingsListApi from '~/composables/api/use-meetings'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import { DECISION } from '~~/constants/decisions'
import { DTT } from '~~/constants/url-paths'
import { solrEscape, andOr } from '~~/utils/solr'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  code: string
}>()

const meetingCodes = computed(() => {
  const entries = DECISION[props.code.toUpperCase() as keyof typeof DECISION] ?? []
  return entries.map(e => e.name)
})

const dttMap = computed(() => {
  const entries = DECISION[props.code.toUpperCase() as keyof typeof DECISION] ?? []
  return Object.fromEntries(entries.filter(e => e.dtt).map(e => [e.name, true]))
})

function getDttUrl(meetingCode: string): string {
  const parts = meetingCode.split('-')
  const num = parts.pop()
  const protocol = parts.join('-').toLowerCase()
  return `${DTT}/${protocol}/${num}`
}

// Build Solr fieldQuery: (symbol_s:COP\-16 OR symbol_s:COP\-15 OR ...)
const fieldQueries = computed(() => {
    const codes = meetingCodes.value
    if (!codes.length) return undefined
    return andOr(codes.map(c => `symbol_s:${solrEscape(c)}`), 'OR')
  })

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: 'startDate_dt DESC',
  fieldQueries: fieldQueries.value
}))

const { meetings, error } = await useMeetingsListApi(queryParams)

const totalPages = computed(() => Math.ceil(meetings.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  meetings.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, meetings.value.total)
)

function goToPage (page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>