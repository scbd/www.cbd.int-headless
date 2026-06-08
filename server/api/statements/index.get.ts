import type { QueryParams } from '~~/types/api/query-params'
import { listStatements } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip, fieldQueries, tags: rawTags, startDate, endDate } = getQuery(event) as QueryParams
  const tags = rawTags != null ? [rawTags].flat().filter(e => e) : undefined
  return await listStatements({ sort, limit, skip, fieldQueries, tags, startDate, endDate }).catch(apiErrorHandler)
})
