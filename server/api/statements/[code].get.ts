import { getStatement } from '~~/services/statement'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getStatement(code)
})
