import { getImage } from '../../../../services/drupal'
import type { Image } from '~~/types/image'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = (getRouterParam(event, 'category') ?? '') as Image['category']

  return await getImage(code, category)
})
