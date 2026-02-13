import { getMeeting } from '~~/services/meeting'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getMeeting(code).catch(apiErrorHandler)
})
