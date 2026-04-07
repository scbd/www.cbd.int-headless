import { viteSyncI18nFiles } from './i18n/sync-i18n'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      include: [
        '../services/**/*',
        '../api/**/*',
        '../utils/**/*',
        '../types/**/*',
        '../constants/**/*',
        '../providers/**/*',
        '../config/**/*'
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],
  site: { indexable: false },
  vite: {
    plugins: [
      viteSyncI18nFiles({})
    ]
  },
  image: {
    provider: 'none'
  },
  i18n: {
    locales: [
      { code: 'ar', iso: 'ar-SA', dir: 'rtl' },
      { code: 'en', iso: 'en-GB' },
      { code: 'es', iso: 'es-ES' },
      { code: 'fr', iso: 'fr-FR' },
      { code: 'ru', iso: 'ru-RU' },
      { code: 'zh', iso: 'zh-CN' }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en'
    },
    strategy: 'prefix_and_default',
    vueI18n: './config/i18n.config.ts'
  },
  runtimeConfig: {
    drupalBaseUrl: '',
    apiBaseUrl: '',
    ortUrl: '',
    // TODO(DEV-842): Set NUXT_INJECT_CALENDAR_MENU_ITEM=false once Drupal CMS
    // has the calendar menu item configured permanently.
    injectCalendarMenuItem: true,
    public: {
      iframeCalendarUrl: ''
    }
  },
  routeRules: {
    '/content/images/**': {
      // NOTE: runtimeConfig not accessible from defineNuxt config.  we need to test use of process.env in the context or use build-time config. TO BE TESTED
      proxy: `${String(process.env.NUXT_DRUPAL_BASE_URL)}/sites/default/files/**`
    },
    '/favicon.ico': {
      headers: { 'cache-control': 'public, max-age=2592000' } // 30 days
    },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=604800' } // 1 week
    },
    // Cache SSR-rendered pages to avoid concurrent full renders under load
    '/': { swr: 600 },
    '/api/**': { swr: 600 },
    '/api/menus/**': { swr: 900 }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    storage: {
      cache: {
        driver: 'lruCache',
        max: 100 // max cached responses
      }
    }
  },
  css: ['~/assets/scss/styles.scss']
})
