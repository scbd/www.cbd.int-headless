import { getDecision } from '~~/services/decision'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return getDecision(code).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'decisions-item'
})
