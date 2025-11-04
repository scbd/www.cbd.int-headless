import type { QueryParams } from '../../../types/api/query-params'
import NotificationService from '../../../services/notification'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await NotificationService.listNotifications({ sort, limit, skip })
})
