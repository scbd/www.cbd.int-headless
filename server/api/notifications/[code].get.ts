import { getNotification } from '~~/services/notification'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNotification(code)
})
