import { viteSyncI18nFiles } from './i18n/sync-i18n'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
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
    drupalClientId: '',
    drupalClientSecret: '',
    drupalScope: '',
    apiBaseUrl: '',
    ortUrl: '',
    public: {
      drupalBaseUrl: process.env.NUXT_DRUPAL_BASE_URL
    }
  },
  css: ['~/assets/scss/styles.scss']
})
