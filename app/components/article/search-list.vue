<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <status v-if="error" :error="error" />
        <div v-else class="cus-serp">
        <!-- Top pagination -->
        <div class="results-info-wrapper">
            <div class="results-info">
            {{ t('showingArticles', {
                startItem: startItem,
                endItem: endItem,
                total: articles.total
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
            v-for="article in articles.rows"
            :key="article.id"
            class="search-item content-object"
            >
            <div class="content-image-wrapper">
                <NuxtImg
                :src="article.coverImage?.path"
                :alt="article.coverImage?.alt"
                class="content-image"
                loading="lazy"
                :placeholder="IMAGE_FALLBACK"
                />
            </div>
            <div class="content-information-wrapper">
                <div class="information">
                <div class="date">{{ toFormatDate(article.createdOn) }}</div>
                <NuxtLink :to="article.alias" class="title">
                    {{ article.title }}
                </NuxtLink>
                <div
                    v-if="article.summary"
                    class="description"
                >{{ truncate(
                    article.summary, {
                      length: 300,
                      separator: ' '
                    })
                }}</div>
                <div class="read-on-wrapper">
                    <NuxtLink :to="article.alias" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                        {{ t('readMore') }}
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
<i18n src="~~/i18n/dist/app/components/article/search-list.json"></i18n>

<script setup lang="ts">
import { getArticleList } from '~/composables/api/use-articles'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { ITEMS_PER_PAGE } from '~~/constants/search'
import { truncate } from 'lodash-es'

const { t } = useI18n()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  searchParams?: {
    search?: string
    sort?: string
  }
}>()

const currentPage = ref(1)

const queryParams = computed(() => ({
  limit: ITEMS_PER_PAGE,
  skip: (currentPage.value - 1) * ITEMS_PER_PAGE,
  sort: props.searchParams?.sort,
  search: props.searchParams?.search
}))

const { data: articles, error } = await getArticleList(queryParams)

const totalPages = computed(() => Math.ceil(articles.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  articles.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, articles.value.total)
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