<template>
  <main class="cus-main d-flex flex-column" role="main">
    <div class="container-xxl flex-grow-1 py-4">
      <h1>{{ t('title') }}</h1>
      <iframe
        v-if="iframeUrl"
        :src="iframeUrl"
        :title="t('iframeTitle')"
        class="calendar-iframe w-100 border-0"
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
const route = useRoute()
const router = useRouter()

const baseUrl = config.public.iframeCalendarUrl as string | undefined
const autoExpand = ref<string | undefined>()

const iframeUrl = computed(() => {
  if (!baseUrl) return undefined;
  if (!autoExpand.value) return baseUrl;

  const url = new URL(baseUrl);
  url.searchParams.set('autoExpand', autoExpand.value);
  return url.toString();
});

watch(() => route.query.autoExpand as string | undefined, (val) => {
  if (!val) return;
  autoExpand.value = val;
  if (import.meta.client) {
    nextTick(() => router.replace({ query: {} }));
  }
}, { immediate: true });

useHead({
  title: computed(() => t('title'))
})

useSeoMeta({
  description: computed(() => t('description'))
})
</script>

<style scoped>
.calendar-iframe {
  min-height: 80vh;
}
</style>

<i18n src="~~/i18n/dist/app/pages/calendar-of-activities-and-actions/index.json"></i18n>
