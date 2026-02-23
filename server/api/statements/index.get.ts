import type { QueryParams } from '~~/types/api/query-params'
import { listStatements } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return listStatements({ sort, limit, skip }).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'statements-list',
  getKey: (event) => {
    const { sort, limit, skip } = getQuery(event) as QueryParams
    return `${sort ?? ''}-${String(limit ?? '')}-${String(skip ?? '')}`
  }
})
