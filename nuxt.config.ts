// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/i18n'
  ],
  site: { indexable: false },
  i18n: {
    locales: [
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', dir: 'rtl' },
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json' },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en'
    },
    strategy: "prefix_and_default",
    vueI18n: './config/i18n.config.ts'
  },
})