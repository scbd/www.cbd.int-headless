import type { Image } from '~~/types/image'

export const IMAGE_FALLBACK = '/images/content-replacement.svg'
export const IMAGE_FALLBACK_CATEGORY = 'image'
export const IMAGE_FALLBACK_ALT = 'Image not available'
export const IMAGE_FALLBACK_WIDTH = 290
export const IMAGE_FALLBACK_HEIGHT = 160
export const DRUPAL_IMAGE_PATH = '/content/images/'

export const DEFAULT_IMAGE: Image = {
  category: IMAGE_FALLBACK_CATEGORY,
  path: IMAGE_FALLBACK,
  alt: IMAGE_FALLBACK_ALT,
  width: IMAGE_FALLBACK_WIDTH,
  height: IMAGE_FALLBACK_HEIGHT
}
