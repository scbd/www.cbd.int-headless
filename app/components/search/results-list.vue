<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <status v-if="error" :error="error" />
    <div v-else-if="results" class="cus-serp">
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingResults', { startItem, endItem, total: results.total }) }}
        </div>
        <search-pagination :current-page="currentPage" :total-pages="totalPages"
          @update:page="goToPage" />
      </div>

      <div class="search-results-items">
        <div v-for="item in results.rows" :key="item.id" class="search-item content-object">
          <div class="content-information-wrapper">
            <div class="information">
              <div class="date">{{ toFormatDate(item.createdOn) }}</div>
              <NuxtLink :to="item.alias" class="title">{{ item.title }}</NuxtLink>
              <p v-if="item.summary" class="summary">{{ truncate(item.summary, { length: 300, separator: '.' }) }}</p>
              <div class="read-on-wrapper">
                <NuxtLink :to="item.alias" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                  {{ t('viewResult') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <search-pagination :current-page="currentPage" :total-pages="totalPages"
        @update:page="goToPage" />
    </div>
  </article>
</template>

<i18n src="~~/i18n/dist/app/components/search/results-list.json"></i18n>

<script setup lang="ts">
import useSearchApi from '~/composables/api/use-search'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import { useFormatDate } from '~/composables/use-format-date'
import { truncate } from 'lodash-es'

const { t } = useI18n()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  searchParams?: { sort?: string; search?: string }
}>()

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: props.searchParams?.sort,
  search: props.searchParams?.search,
}))

const { results, error } = await useSearchApi(queryParams)

const totalPages = computed(() => Math.ceil(results.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  results.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, results.value.total))

function goToPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => props.searchParams, () => { currentPage.value = 1 }, { deep: true })
</script>
