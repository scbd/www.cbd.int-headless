import type { QueryParams } from '~~/types/api/query-params'
import { listPages } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listPages({ sort, limit, skip }).catch(apiErrorHandler)
})
