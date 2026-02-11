import { getImage } from '~~/services/drupal'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'
import type { Image } from '~~/types/image'

export default apiFetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return await getImage(code, category)
})
