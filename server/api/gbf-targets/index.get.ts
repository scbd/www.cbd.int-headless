import { getGbfTarget } from '~~/services/gbf-targets'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  return await getGbfTarget().catch(apiErrorHandler)
})
