import VueDOMPurifyHTML from 'vue-dompurify-html'
import DOMPurify from 'isomorphic-dompurify'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { drupalBaseUrl } } = useRuntimeConfig()
  const matchDrupalImgSrc = /^.*\/sites\/default\/files\//

  nuxtApp.vueApp.use(
    VueDOMPurifyHTML,
    {
      default: {
        ADD_TAGS: ['iframe']
      },
      namedConfigurations: {
        plaintext: {
          USE_PROFILES: { html: false }
        }
      },
      enableSSRPropsSupport: true,
      hooks: {
        uponSanitizeElement: (currentNode: any) => {
          if (currentNode.nodeName === 'IMG' && matchDrupalImgSrc.test(currentNode.src)) {
            currentNode.src = currentNode.src.replace(matchDrupalImgSrc, `${String(drupalBaseUrl)}/sites/default/files/`)
          }
        }
      }
    },
    () => DOMPurify
  )
})
