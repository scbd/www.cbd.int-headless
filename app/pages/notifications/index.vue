<template>
  <main class="cus-main cus-serp d-flex flex-column" role="main">
    <article class="cus-article container-xxl d-flex flex-column">
      <section>
        <h1>{{ t('notification', 1) }}</h1>
        <p>Search Criteria</p>
      </section>
      <section>
        <shared-forms-search-filter-sort :query="query" />
      </section>
      <section class="search-results">
        <!-- shared-forms-pagination -->
        <div class="search-results-items">
          <notification-card-search
            v-for="notification of items"
            :notification="notification"
          />
        </div>
        <!-- shared-forms-pagination -->
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import useNotificationsApi from '~/composables/api/use-notifications'

const { t } = useI18n()

const isError = ref<Error>()
const { getNotifications } = useNotificationsApi()
const { rows: items } = await getNotifications({ limit: 25 }).catch(
  (error: Error) => {
    isError.value = error
    return { rows: [] }
  }
)

const query = computed(() => ({
  year: '0'
}))

definePageMeta({
  layout: 'home'
})
</script>
