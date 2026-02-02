import { getImage } from '../../../../services/drupal'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const category = getRouterParam(event, 'category') ?? ''

  return await getImage(code, category)
})
