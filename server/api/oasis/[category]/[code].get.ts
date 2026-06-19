import { getOasisArticle } from '~~/services/oasis'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const category = getRouterParam(event, 'category') ?? ''
  const code = getRouterParam(event, 'code') ?? ''
  return await getOasisArticle(category, code).catch(apiErrorHandler)
})
