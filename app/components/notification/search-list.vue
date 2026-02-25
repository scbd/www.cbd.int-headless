<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <status v-if="error" :error="error" />
    <div v-else class="cus-serp">
      <!-- Top pagination -->
      <div class="results-info-wrapper">
        <div class="results-info">
          {{ t('showingNotifications', { 
            startItem: startItem,
            endItem: endItem,
            total: notifications.total
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
          v-for="notification in notifications.rows"
          :key="notification.id"
          class="search-item content-object"
        >
          <div class="content-image-wrapper">
            <NuxtImg
              :src="notification?.image?.path"
              :alt="notification?.image?.alt"
              class="content-image"
              loading="lazy"
              :placeholder="IMAGE_FALLBACK"
            />
          </div>
          <div class="content-information-wrapper">
            <div class="information">
              <div class="date">{{ toFormatDate(notification.createdOn) }}</div>
              <NuxtLink :to="notification.urls?.[0]" class="title">
                {{ notification.code }} &ndash; {{ toLocaleText(notification.title) }}
              </NuxtLink>
              <div v-if="notification.actionOn" class="action-required">
                {{ t('actionRequired') }} {{ toFormatDate(notification.actionOn) }}
              </div>
              <div class="subjects" v-if="notification.themes?.length">
                {{ t('subjects') }}
                <template v-for="(theme, i) of notification.themes" :key="i">
                  {{ toLocaleText(theme) }}<template v-if="i < notification.themes.length - 1">, </template>
                </template>
              </div>
              <div class="recipients" v-if="notification.recipients?.length">
                {{ t('recipients') }}
                <template v-for="(recipient, i) of notification.recipients" :key="i">
                  {{ toLocaleText(recipient) }}<template v-if="i < notification.recipients.length - 1">, </template>
                </template>
              </div>
              <div
                v-if="toLocaleText(notification.fulltext)"
                class="description"
              >{{ truncate(
                    toLocaleText(notification.fulltext), {
                      length: 300,
                      separator: ' '
                    })
              }}</div>
              <div class="read-on-wrapper">
                <NuxtLink :to="notification.urls?.[0]" class="btn cbd-btn cbd-btn-primary btn cbd-btn-more-content read-on">
                  {{ t('viewNotification') }}
                </NuxtLink>
              </div>
            </div>
            <div class="files" v-if="notification.file">
              <div class="files-title">{{ t('files') }}</div>
              <div class="files-available">
                <NuxtLink class="file-badge" target="_blank" :href="notification.file.url">
                  <NuxtImg
                    v-if="notification.file.type?.match(/application\/pdf/)"
                    src="/images/icons/icon-file-pdf.svg"
                    alt="t('pdf')"
                  />
                  <NuxtImg
                    v-else-if="notification.file.type?.match(/\.doc/)"
                    src="/images/icons/icon-file-doc.svg"
                    alt="t('doc')"
                  />
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
<i18n src="~~/i18n/dist/app/components/notification/search-list.json"></i18n>

<script setup lang="ts">
import useNotificationsListApi from '~/composables/api/use-notifications'
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

const { notifications, error } = await useNotificationsListApi(queryParams)

const totalPages = computed(() => Math.ceil(notifications.value.total / ITEMS_PER_PAGE))
const startItem = computed(() =>
  notifications.value.total === 0 ? 0 : (currentPage.value - 1) * ITEMS_PER_PAGE + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * ITEMS_PER_PAGE, notifications.value.total)
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
