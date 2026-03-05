import type { QueryParams } from '~~/types/api/query-params'
import { listNbsaps } from '~~/services/nbsap'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listNbsaps({ sort, limit, skip }).catch(apiErrorHandler)
})
