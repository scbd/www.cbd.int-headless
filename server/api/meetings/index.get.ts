import type { QueryParams } from '~~/types/api/query-params'
import { listMeetings } from '~~/services/meeting'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { fieldQueries, tags: rawTags, sort, limit, skip, startDate, endDate } = getQuery(event) as QueryParams
  const tags = rawTags != null ? [rawTags].flat() : undefined
  return await listMeetings({ fieldQueries, tags, sort, limit, skip, startDate, endDate }).catch(apiErrorHandler)
})
