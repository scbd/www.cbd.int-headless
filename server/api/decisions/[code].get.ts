import { getDecision } from '~~/services/decisions'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default apiFetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getDecision(code).catch(apiErrorHandler)
})
