import { getNbsap } from '~~/services/nbsap'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getNbsap(code).catch(apiErrorHandler)
})
