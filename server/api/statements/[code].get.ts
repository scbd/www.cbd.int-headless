import { getStatement } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getStatement(code).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'statements-item'
})
