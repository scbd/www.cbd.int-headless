import type { Statement } from '../../../types/statement'
import StatementService from '../../../services/statement'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') || ''
  return await StatementService.getStatement(code)
})
