import { getImage } from '~~/services/drupal'
import { fetchHandler } from '~~/server/utils/fetch-handler'
import type { Image } from '~~/types/image'

export default fetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return await getImage(code, category)
})
