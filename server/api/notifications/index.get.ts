import type { QueryParams } from '~~/types/api/query-params'
import { listNotifications } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { fieldQueries, sort, limit, skip, startDate, endDate } = getQuery(event) as QueryParams
  return await listNotifications({ fieldQueries, sort, limit, skip, startDate, endDate }).catch(apiErrorHandler)
})
