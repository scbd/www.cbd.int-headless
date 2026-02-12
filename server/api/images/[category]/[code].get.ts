import { getImage } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import type { Image } from '~~/types/image'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return await getImage(code, category).catch(apiErrorHandler)
})
