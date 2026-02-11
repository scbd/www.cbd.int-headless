import type { QueryParams } from '~~/types/api/query-params'
import { listStatements } from '~~/services/statement'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listStatements({ sort, limit, skip })
})
