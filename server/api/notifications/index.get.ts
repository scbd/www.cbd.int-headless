import type { QueryParams } from '~~/types/api/query-params'
import { listNotifications } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { fieldQueries, tags: rawTags, sort, limit, skip, startDate, endDate } = getQuery(event) as QueryParams
  const tags = rawTags != null ? [rawTags].flat() : undefined
  return await listNotifications({ fieldQueries, tags, sort, limit, skip, startDate, endDate }).catch(apiErrorHandler)
})
