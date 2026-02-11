import type { QueryParams } from '~~/types/api/query-params'
import { listNotifications } from '~~/services/notification'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listNotifications({ sort, limit, skip })
})
