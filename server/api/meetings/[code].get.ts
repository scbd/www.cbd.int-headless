import { getMeeting } from '~~/services/meeting'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getMeeting(code)
})
