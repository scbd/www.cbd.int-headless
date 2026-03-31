<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <h1>{{ t('title', { meetingCode }) }}</h1>

    <status v-if="error" :error="error" />
    <template v-else>
      <template v-if="decisions.total === 0">
        <p>{{ t('noDecisionsFound', { meetingCode }) }}</p>
      </template>
      <div v-else class="cus-serp">
        <!-- Top pagination -->
        <div class="results-info-wrapper">
          <div class="results-info">
            {{ t('showingItems', { startItem, endItem, total: decisions.total }) }}
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
            v-for="decision in decisions.rows"
            :key="decision.id"
            class="search-item content-object"
          >
            <div class="content-information-wrapper">
              <div class="information">
                <h2>{{ t('decision') }} {{ decision.code }} - {{ toLocaleText(decision.title) }}</h2>

                <div v-if="decision.file" class="read-on-wrapper gap-2">
                  <a
                    v-for="(url, lang) in decision.file"
                    :key="lang"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn cbd-btn cbd-btn-outline-more-content"
                  >
                    {{ t(lang) }}
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
    </template>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/decision/content.json"></i18n>

<script setup lang="ts">
import useDecisionsListApi from '~/composables/api/use-decisions'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import { solrEscape } from '~~/utils/solr'

const props = defineProps<{
  code: string
  meetingCode: string
}>()

const { t } = useI18n()
const { toLocaleText } = useLString()

const fieldQuery = computed(
  () => `meeting_ss:${solrEscape(props.meetingCode)}`
)

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: 'decision_i ASC',
  fieldQueries: fieldQuery.value
}))

const { decisions, error } = await useDecisionsListApi(queryParams)

const totalPages = computed(() => Math.ceil(decisions.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  decisions.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, decisions.value.total)
)

function goToPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>