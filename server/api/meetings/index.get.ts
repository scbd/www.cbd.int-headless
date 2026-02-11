import type { QueryParams } from '~~/types/api/query-params'
import { listMeetings } from '~~/services/meeting'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listMeetings({ sort, limit, skip })
})
