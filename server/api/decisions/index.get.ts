import type { QueryParams } from '~~/types/api/query-params'
import { listDecisions } from '~~/services/decision'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listDecisions({ sort, limit, skip }).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'decisions-list'
})
