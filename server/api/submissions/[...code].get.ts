import { listSubmissions } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import type { QueryParams } from '~~/types/api/query-params'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listSubmissions({ code, sort, limit, skip }).catch(apiErrorHandler)
})
