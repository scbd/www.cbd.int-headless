import type { QueryParams } from '~~/types/api/query-params'
import { listNotifications } from '~~/services/notification'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listNotifications({ sort, limit, skip })
})
