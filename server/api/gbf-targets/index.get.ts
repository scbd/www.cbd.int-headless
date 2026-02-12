import { getGbfTargets } from '~~/services/gbf-targets'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  return await getGbfTargets().catch(apiErrorHandler)
})
