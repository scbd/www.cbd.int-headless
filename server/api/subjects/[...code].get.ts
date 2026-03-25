import { getSubjects } from '~~/services/subjects'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getSubjects(code).catch(apiErrorHandler)
})
