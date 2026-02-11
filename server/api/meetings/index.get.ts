import type { QueryParams } from '~~/types/api/query-params'
import { listMeetings } from '~~/services/meeting'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listMeetings({ sort, limit, skip })
})
