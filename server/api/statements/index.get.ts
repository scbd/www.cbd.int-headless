import type { QueryParams } from '../../../types/api/query-params'
import { listStatements } from '../../../services/statement'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listStatements({ sort, limit, skip })
})
