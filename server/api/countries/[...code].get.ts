import { getCountry } from '~~/services/country'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getCountry(code).catch(apiErrorHandler)
})
