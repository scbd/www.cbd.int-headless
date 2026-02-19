import { getMeeting } from '~~/services/meeting'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getMeeting(code).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'meetings-item'
})
