import { getNotification } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNotification(code).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'notifications-item'
})
