import NotificationService from '../../../services/notification'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') || ''
  return await NotificationService.getNotification(code)
})
