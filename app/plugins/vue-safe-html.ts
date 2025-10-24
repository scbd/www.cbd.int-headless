import VueSafeHtml from 'vue-safe-html';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSafeHtml);
});
