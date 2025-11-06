import { getStatement } from '../../../services/statement'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getStatement(code)
})
