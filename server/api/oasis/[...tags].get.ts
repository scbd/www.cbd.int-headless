import { getOasisArticle } from '~~/services/oasis'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  // ponytail: tags are path segments joined by '/'; assumes individual tags contain no '/'
  const adminTags = (getRouterParam(event, 'tags') ?? '').split('/').filter(Boolean)
  return await getOasisArticle(adminTags).catch(apiErrorHandler)
})
