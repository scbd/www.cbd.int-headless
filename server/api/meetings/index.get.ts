import type { QueryParams } from '../../../types/api/query-params'
import { listMeetings } from '../../../services/meeting'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listMeetings({ sort, limit, skip })
})
