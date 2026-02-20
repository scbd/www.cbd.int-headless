import { getImage } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import type { Image } from '~~/types/image'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return await getImage(code, category).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'images-item'
})
