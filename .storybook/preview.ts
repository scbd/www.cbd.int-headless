import type { Preview } from '@storybook-vue/nuxt'
import { useNuxtApp } from 'nuxt/app'

// ponytail: minimal same-origin fetch mock driven by `parameters.api` ({ '/api/path': json | Response }),
// until @storybook-vue/nuxt ships registerEndpoint (merged after 10.0.3).
// One map per preview window: stories with different `api` on one docs page need `docs.story.inline: false`.
let api: Record<string, unknown> = {}
const realFetch = window.fetch.bind(window)
window.fetch = async (input, init) => {
  const url = new URL(input instanceof Request ? input.url : String(input), location.href)
  const mock = url.origin === location.origin ? api[url.pathname] : undefined
  if (mock === undefined) return await realFetch(input, init)
  return mock instanceof Response ? mock.clone() : Response.json(mock)
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      description: 'Locale',
      toolbar: { icon: 'globe', items: ['en', 'ar', 'es', 'fr', 'ru', 'zh'], dynamicTitle: true }
    }
  },
  initialGlobals: { locale: 'en' },
  decorators: [
    (story, { globals, parameters }) => {
      api = parameters.api ?? {}
      return {
        components: { story },
        setup () {
          // app.vue sets lang/dir in the real app; it isn't rendered in stories
          const { $i18n } = useNuxtApp()
          $i18n.locale.value = globals.locale
          document.documentElement.lang = globals.locale
          document.documentElement.dir = $i18n.localeProperties.value.dir ?? 'ltr'
        },
        // Components that await data in setup (card-lists, search-lists) are async
        template: '<Suspense><story /></Suspense>'
      }
    }
  ]
}

export default preview
