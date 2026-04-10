import VueDOMPurifyHTML from 'vue-dompurify-html'
import DOMPurify from 'isomorphic-dompurify'

export default defineNuxtPlugin((nuxtApp) => {
  const iframeAllowedSrc = [
    // YouTube
    /^(https?:)?\/\/(www\.)?youtube\.com\/embed\//,
    /^(https?:)?\/\/youtu\.be\//,
    /^(https?:)?\/\/if-cdn\.com\//,
    // CBD
    /^https?:\/\/[^/]+\.cbd\.int\//
  ]

  nuxtApp.vueApp.use(
    VueDOMPurifyHTML,
    {
      default: {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
      },
      namedConfigurations: {
        plaintext: {
          USE_PROFILES: { html: false }
        }
      },
      enableSSRPropsSupport: true,
      hooks: {
        uponSanitizeElement: (currentNode: any) => {
          // Limit iframes to only allow whitelisted domains
          if (currentNode.nodeName === 'IFRAME') {
            const src = currentNode.getAttribute('src')
            if (src === null || src === undefined || !iframeAllowedSrc.some(p => p.test(src))) {
              currentNode.parentNode?.removeChild(currentNode)
            }
          }
        }
      }
    },
    () => DOMPurify
  )
})
