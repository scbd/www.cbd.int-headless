import type { QueryParams } from '~~/types/api/query-params'
import { listStatements } from '~~/services/statement'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listStatements({ sort, limit, skip })
})
