import VueDOMPurifyHTML from 'vue-dompurify-html'
import DOMPurify from 'isomorphic-dompurify'
import { DRUPAL_IMAGE_PATH } from '~~/constants/image-paths'

export default defineNuxtPlugin((nuxtApp) => {
  const matchDrupalImgSrc = /^.*\/sites\/default\/files\//
  const youtubeSrc = /^(https?:)?\/\/((www\.)?youtube\.com\/embed\/|youtu\.be\/|if-cdn\.com\/)/

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
          // Convert Drupal image paths to use the path defined on the nuxt.config.ts
          if (currentNode.nodeName === 'IMG' && matchDrupalImgSrc.test(currentNode.src)) {
            currentNode.src = currentNode.src.replace(matchDrupalImgSrc, DRUPAL_IMAGE_PATH)
          }
          // Add Bootstrap flex class to WP columns block to allow three columns display to work on the front-end
          if (currentNode.className === 'wp-block-columns') {
            currentNode.setAttribute('class', 'wp-block-columns d-flex')
          }
          // Limit iframes to only allow YouTube embeds
          if (currentNode.nodeName === 'IFRAME') {
            const src = currentNode.getAttribute('src')
            if (src === null || src === undefined || !youtubeSrc.test(src)) {
              currentNode.parentNode?.removeChild(currentNode)
            }
          }
        }
      }
    },
    () => DOMPurify
  )
})
