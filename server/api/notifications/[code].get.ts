import { getNotification } from '../../../services/notification'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNotification(code)
})
