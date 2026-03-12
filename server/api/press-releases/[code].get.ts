import { getPressRelease } from '~~/services/press-release'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getPressRelease(code).catch(apiErrorHandler)
})
