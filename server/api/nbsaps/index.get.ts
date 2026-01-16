import type { QueryParams } from '../../../types/api/query-params'
import { listNbsaps } from '../../../services/nbsap'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listNbsaps({ sort, limit, skip })
})
