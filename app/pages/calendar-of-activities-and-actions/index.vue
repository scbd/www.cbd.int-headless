<template>
  <main class="cus-main d-flex flex-column" role="main">
    <div class="container-xxl flex-grow-1 py-4">
      <h1>{{ t('title') }}</h1>
      <iframe
        v-if="iframeUrl"
        :src="iframeUrl"
        :title="t('iframeTitle')"
        class="calendar-iframe w-100 border-0"
        loading="lazy"
        referrerpolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      <p v-else class="text-muted">{{ t('unavailable') }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
/**
 * Calendar of Activities and Actions page.
 *
 * Wraps the external calendar application in an iframe while preserving
 * the site's header and footer via the 'home' layout.
 * The iframe URL is sourced from runtime config (NUXT_PUBLIC_IFRAME_CALENDAR_URL).
 */
definePageMeta({
  layout: 'home'
})

const { t } = useI18n()
const config = useRuntimeConfig()

const iframeUrl = config.public.iframeCalendarUrl

useHead({
  title: t('title')
})

useSeoMeta({
  description: t('description')
})
</script>

<style scoped>
.calendar-iframe {
  min-height: 80vh;
}
</style>

<i18n src="~~/i18n/dist/app/pages/calendar-of-activities-and-actions/index.json"></i18n>
