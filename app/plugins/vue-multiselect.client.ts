import Multiselect from 'vue-multiselect'

/**
 * Client-only plugin that registers the `vue-multiselect` component globally.
 * Used by calendar filter dropdowns and other select inputs.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Multiselect', Multiselect)
})
