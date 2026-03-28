<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <status v-if="error" :error="error" />
    <div v-else class="cus-serp">
      <!-- Top pagination -->
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingMeetings', { startItem, endItem, total: meetings.total }) }}
        </div>
        <search-pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="goToPage"
        />
      </div>

      <!-- Upcoming Meetings -->
      <template v-if="upcomingGroups.length">
        <h2>{{ t('upcomingMeetings') }}</h2>
        <template v-for="group in upcomingGroups" :key="group.label">
          <h3>{{ group.label }}</h3>
          <div class="search-results-items">
            <div v-for="meeting in group.meetings" :key="meeting.id" class="search-item content-object">
              <div class="content-image-wrapper">
                <NuxtImg :src="meeting?.image?.path" :alt="meeting?.image?.alt"
                  class="content-image" loading="lazy" :placeholder="IMAGE_FALLBACK" />
              </div>
              <div class="content-information-wrapper">
                <div class="information">
                  <div class="date">{{ toFormatDate(meeting.startOn) }} - {{ toFormatDate(meeting.endOn) }}</div>
                  <NuxtLink :to="meeting.urls?.[0]" class="title">
                    {{ toLocaleText(meeting.title) }}
                  </NuxtLink>
                  <div class="location" v-if="meeting.city.en === 'Online'">{{ toLocaleText(meeting.city) }}</div>
                  <div class="location" v-else>{{ toLocaleText(meeting.country) }}, {{ toLocaleText(meeting.city) }}</div>
                  <div v-if="meeting.themes.length" class="subjects">
                    {{ t('subjects') }}
                    <template v-for="(theme, i) of meeting.themes" :key="i">
                      {{ toLocaleText(theme) }}<template v-if="i < meeting.themes.length - 1">, </template>
                    </template>
                  </div>
                  <div class="read-on-wrapper">
                    <NuxtLink :to="meeting.urls?.[0]" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                      {{ t('viewMeeting') }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>

      <!-- Previous Meetings -->
      <template v-if="previousGroups.length">
        <h2>{{ t('previousMeetings') }}</h2>
        <template v-for="group in previousGroups" :key="group.label">
          <h3>{{ group.label }}</h3>
          <div class="search-results-items">
            <div v-for="meeting in group.meetings" :key="meeting.id" class="search-item content-object">
              <div class="content-image-wrapper">
                <NuxtImg :src="meeting?.image?.path" :alt="meeting?.image?.alt"
                  class="content-image" loading="lazy" :placeholder="IMAGE_FALLBACK" />
              </div>
              <div class="content-information-wrapper">
                <div class="information">
                  <div class="date">{{ toFormatDate(meeting.startOn) }} - {{ toFormatDate(meeting.endOn) }}</div>
                  <NuxtLink :to="meeting.urls?.[0]" class="title">
                    {{ meeting.code }} &ndash; {{ toLocaleText(meeting.title) }}
                  </NuxtLink>
                  <div class="location" v-if="meeting.city.en === 'Online'">{{ toLocaleText(meeting.city) }}</div>
                  <div class="location" v-else>{{ toLocaleText(meeting.country) }}, {{ toLocaleText(meeting.city) }}</div>
                  <div v-if="meeting.themes.length" class="subjects">
                    {{ t('subjects') }}
                    <template v-for="(theme, i) of meeting.themes" :key="i">
                      {{ toLocaleText(theme) }}<template v-if="i < meeting.themes.length - 1">, </template>
                    </template>
                  </div>
                  <div class="read-on-wrapper">
                    <NuxtLink :to="meeting.urls?.[0]" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                      {{ t('viewMeeting') }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>

      <!-- Bottom pagination -->
      <search-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="goToPage"
      />
    </div>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/meeting/search-list.json"></i18n>

<script setup lang="ts">
import useMeetingsListApi from '~/composables/api/use-meetings'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import type { Meeting } from '~~/types/meeting'

const { t, locale } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  searchParams?: {
    fieldQueries?: string
    startDate?: string
    endDate?: string
  }
}>()

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  fieldQueries: props.searchParams?.fieldQueries,
  startDate: props.searchParams?.startDate ?? (props.searchParams?.endDate ? undefined : 'NOW'),
  endDate: props.searchParams?.endDate
}))

const { meetings, error } = await useMeetingsListApi(queryParams)

// Group meetings by month, split into upcoming vs previous
interface MonthGroup { label: string; meetings: Meeting[] }

const now = new Date()

const upcomingGroups = computed<MonthGroup[]>(() => {
  const upcoming = meetings.value.rows.filter(m => new Date(m.endOn) >= now)
  return groupByMonth(upcoming)
})

const previousGroups = computed<MonthGroup[]>(() => {
  const previous = meetings.value.rows.filter(m => new Date(m.endOn) < now)
  return groupByMonth(previous)
})

function groupByMonth (items: Meeting[]): MonthGroup[] {
  const groups = new Map<string, Meeting[]>()
  for (const meeting of items) {
    const date = new Date(meeting.startOn)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(meeting)
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, meetings]) => {
      const date = new Date(meetings[0]!.startOn)
      return {
        label: date.toLocaleDateString(locale.value, { year: 'numeric', month: 'long' }),
        meetings
      }
    })
}

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

// Reset to page 1 when search params change
watch(() => props.searchParams, () => {
  currentPage.value = 1
}, { deep: true })
</script>