import type { QueryParams } from '~~/types/api/query-params'
import { listMeetings } from '~~/services/meeting'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listMeetings({ sort, limit, skip }).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'meetings-list',
  getKey: (event) => {
    const { sort, limit, skip } = getQuery(event) as QueryParams
    return `${sort ?? ''}-${String(limit ?? '')}-${String(skip ?? '')}`
  }
})
