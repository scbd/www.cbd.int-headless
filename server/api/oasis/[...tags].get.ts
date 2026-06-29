import { getOasisArticle } from '~~/services/oasis'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const adminTags = (getRouterParam(event, 'tags') ?? '').split('/').filter(Boolean)
  return await getOasisArticle(adminTags).catch(apiErrorHandler)
})
