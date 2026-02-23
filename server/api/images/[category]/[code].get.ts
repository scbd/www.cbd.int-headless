import { getImage } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import type { Image } from '~~/types/image'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return getImage(code, category).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'images-item'
})
