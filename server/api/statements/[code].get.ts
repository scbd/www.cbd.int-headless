import { getStatement } from '~~/services/statement'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default fetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getStatement(code).catch(apiErrorHandler)
})
