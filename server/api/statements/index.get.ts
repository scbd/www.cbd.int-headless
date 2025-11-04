import type { StatementList } from '../../../types/statement'
import type { QueryParams } from '../../../types/api/query-params'
import StatementService from '../../../services/statement'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await StatementService.listStatements({ sort, limit, skip })
})
