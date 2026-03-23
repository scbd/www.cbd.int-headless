import { listSubmissions } from '~~/services/notification'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await listSubmissions({ code }).catch(apiErrorHandler)
})
