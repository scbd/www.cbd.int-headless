import { getNotification } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default fetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNotification(code).catch(apiErrorHandler)
})
