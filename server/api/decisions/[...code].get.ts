import { getDecision } from '~~/services/decision'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getDecision(code).catch(apiErrorHandler)
})
