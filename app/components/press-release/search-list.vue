<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <status v-if="error" :error="error" />
        <div v-else class="cus-serp">
        <!-- Top pagination -->
        <div class="results-info-wrapper">
            <div class="results-info">
            {{ t('showingPressReleases', { 
                startItem: startItem,
                endItem: endItem,
                total: pressReleases.total
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
            v-for="pressRelease in pressReleases.rows"
            :key="pressRelease.id"
            class="search-item content-object"
            >
            <div class="content-image-wrapper">
                <NuxtImg
                :src="pressRelease?.image?.path"
                :alt="pressRelease?.image?.alt"
                class="content-image"
                loading="lazy"
                :placeholder="IMAGE_FALLBACK"
                />
            </div>
            <div class="content-information-wrapper">
                <div class="information">
                <div class="date">{{ toFormatDate(pressRelease.createdOn) }}</div>
                <NuxtLink :to="pressRelease.urls?.[0]" class="title">
                    {{ pressRelease.code }} &ndash; {{ toLocaleText(pressRelease.title) }}
                </NuxtLink>
                <div class="themes">
                    {{ t('themes') }}
                    <template v-for="(theme, i) of pressRelease.themes" :key="i">
                    {{ toLocaleText(theme) }}<template v-if="i < pressRelease.themes.length - 1">, </template>
                    </template>
                </div>
                <div class="read-on-wrapper">
                    <NuxtLink :to="pressRelease.urls?.[0]" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                        {{ t('viewPressRelease') }}
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
<i18n src="~~/i18n/dist/app/components/press-release/search-list.json"></i18n>

<script setup lang="ts">
import { getPressReleaseList } from '~/composables/api/use-press-releases'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { ITEMS_PER_PAGE } from '~~/constants/search'

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

const { data: pressReleases, error } = await getPressReleaseList(queryParams)

const totalPages = computed(() => Math.ceil(pressReleases.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  pressReleases.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, pressReleases.value.total)
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
