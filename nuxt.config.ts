// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  site: { indexable: false },
  i18n: {
    locales: [
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', dir: 'rtl' },
      { code: 'en', iso: 'en-GB', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json' },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
    strategy: 'prefix_and_default',
    vueI18n: './config/i18n.config.ts',
  },
  image: {
    domains: ['cms-dev.drupal.www.infra.cbd.int'],
    providers: {
      drupal: {
        name: 'drupal',
        provider: '../providers/drupal.ts',
        options: {
          baseURL:
            'https://cms-dev.drupal.www.infra.cbd.int/sites/default/files/',
          // `${process.env.NUXT_DRUPAL_BASE_URL}/sites/default/files/`,
        },
      },
    },
  },
  runtimeConfig: {
    drupalBaseUrl: '',
    drupalClientId: '',
    drupalClientSecret: '',
    drupalScope: '',
    apiBaseUrl: '',
    ortUrl: '',
  },
  routeRules: {
    '/content/images/**': {
      // NOTE: runtimeConfig not accessible from defineNuxt config.  we need to test use of process.env in the context or use build-time config. TO BE TESTED
      proxy: `${process.env.NUXT_DRUPAL_BASE_URL}/sites/default/files/**`,
    },
  },
  css: ['~/assets/scss/styles.scss'],
});
