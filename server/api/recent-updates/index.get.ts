import type { QueryParams } from '~~/types/api/query-params'
import { listRecentUpdates } from '~~/services/recent-updates'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listRecentUpdates({ sort, limit, skip }).catch(apiErrorHandler)
})