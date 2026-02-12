import { getStatement } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getStatement(code).catch(apiErrorHandler)
})
