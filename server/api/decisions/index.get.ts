import type { QueryParams } from '~~/types/api/query-params'
import { listDecisions } from '~~/services/decisions'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default apiFetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listDecisions({ sort, limit, skip }).catch(apiErrorHandler)
})
