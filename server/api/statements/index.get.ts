import type { QueryParams } from '~~/types/api/query-params'
import { listStatements } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip, fieldQueries } = getQuery(event) as QueryParams
  return await listStatements({ sort, limit, skip, fieldQueries }).catch(apiErrorHandler)
})
