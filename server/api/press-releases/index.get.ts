import type { QueryParams } from '~~/types/api/query-params'
import { listPressReleases } from '~~/services/press-release'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip, tags: rawTags, fieldQueries, startDate, endDate } = getQuery(event) as QueryParams
  const tags = rawTags != null ? [rawTags].flat() : undefined
  return await listPressReleases({ sort, limit, skip, tags, fieldQueries, startDate, endDate }).catch(apiErrorHandler)
})
