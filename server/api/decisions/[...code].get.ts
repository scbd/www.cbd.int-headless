import { getDecision } from '~~/services/decision'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getDecision(code).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'decisions-item'
})
