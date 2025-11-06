import type { QueryParams } from '../../../types/api/query-params'
import { listNotifications } from '../../../services/notification'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listNotifications({ sort, limit, skip })
})
