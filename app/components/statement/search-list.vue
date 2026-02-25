<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <status v-if="error" :error="error" />
    <div v-else class="cus-serp">
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingStatements', { startItem, endItem, total: statements.total }) }}
        </div>
        <search-pagination :current-page="currentPage" :total-pages="totalPages" @update:page="goToPage" />
      </div>

      <div class="search-results-items">
        <div v-for="statement in statements.rows" :key="statement.id" class="search-item content-object">
          <div class="content-image-wrapper">
            <NuxtImg :src="statement?.image?.path" :alt="statement?.image?.alt"
              class="content-image" loading="lazy" :placeholder="IMAGE_FALLBACK" />
          </div>
          <div class="content-information-wrapper">
            <div class="information">
              <div class="date">{{ toFormatDate(statement.createdOn) }}</div>
              <NuxtLink :to="statement.urls?.[0]" class="title">
                {{ statement.code }} &ndash; {{ toLocaleText(statement.title) }}
              </NuxtLink>
              <div class="subjects" v-if="statement.themes?.length">
                {{ t('themes') }}
                <template v-for="(theme, i) of statement.themes" :key="i">
                  {{ toLocaleText(theme) }}<template v-if="i < statement.themes.length - 1">, </template>
                </template>
              </div>
              <div class="read-on-wrapper">
                <NuxtLink :to="statement.urls?.[0]" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                  {{ t('viewStatement') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <search-pagination :current-page="currentPage" :total-pages="totalPages" @update:page="goToPage" />
    </div>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/statement/search-list.json"></i18n>

<script setup lang="ts">
import useStatementsApi from '~/composables/api/use-statements'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { ITEMS_PER_PAGE } from '~~/constants/search'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  searchParams?: { fieldQueries?: string; sort?: string }
}>()

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: props.searchParams?.sort,
  fieldQueries: props.searchParams?.fieldQueries
}))

const { statements, error } = await useStatementsApi(queryParams)

const totalPages = computed(() => Math.ceil(statements.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  statements.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, statements.value.total)
)

function goToPage (page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => props.searchParams, () => {
  currentPage.value = 1
}, { deep: true })
</script>