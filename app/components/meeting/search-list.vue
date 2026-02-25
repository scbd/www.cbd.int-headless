<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <status v-if="error" :error="error" />
    <div v-else class="cus-serp">
      <!-- Top pagination -->
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingMeetings', { 
            startItem: startItem,
            endItem: endItem,
            total: meetings.total
          }) }}
        </div>
        <search-pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="goToPage"
        />
      </div>

      <!-- Results -->
      <div class="search-results-items">
        <div
          v-for="meeting in meetings.rows"
          :key="meeting.id"
          class="search-item content-object"
        >
          <div class="content-image-wrapper">
            <NuxtImg
              :src="meeting?.image?.path"
              :alt="meeting?.image?.alt"
              class="content-image"
              loading="lazy"
              :placeholder="IMAGE_FALLBACK"
            />
          </div>
          <div class="content-information-wrapper">
            <div class="information">
              <div class="date">{{ toFormatDate(meeting.startOn) }} &ndash; {{ toFormatDate(meeting.endOn) }}</div>
              <NuxtLink :to="meeting.urls?.[0]" class="title">
                {{ meeting.code }} &ndash; {{ toLocaleText(meeting.title) }}
              </NuxtLink>
              <div v-if="meeting.city || meeting.country" class="location">
                {{ toLocaleText(meeting.city) }}<template v-if="toLocaleText(meeting.city) !== 'Online'">, </template>{{ toLocaleText(meeting.country) }}
              </div>
              <div class="subjects" v-if="meeting.themes?.length">
                {{ t('themes') }}
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
import useMeetingsApi from '~/composables/api/use-meetings'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import { truncate } from 'lodash'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  searchParams?: {
    fieldQueries?: string
    sort?: string
  }
}>()

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: props.searchParams?.sort,
  fieldQueries: props.searchParams?.fieldQueries
}))

const { meetings, error } = await useMeetingsApi(queryParams)

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
