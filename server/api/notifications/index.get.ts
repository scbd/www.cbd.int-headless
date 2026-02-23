import type { QueryParams } from '~~/types/api/query-params'
import { listNotifications } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip, fieldQueries } = getQuery(event) as QueryParams
  return await listNotifications({ fieldQueries, sort, limit, skip }).catch(apiErrorHandler)
})
