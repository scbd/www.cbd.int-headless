import { getNotification } from '~~/services/notification'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNotification(code)
})
