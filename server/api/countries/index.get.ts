import type { QueryParams } from '~~/types/api/query-params'
import { listCountries } from '~~/services/country'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listCountries({ sort, limit, skip }).catch(apiErrorHandler)
})
