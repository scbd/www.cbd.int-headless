import { getGbfTargets } from '~~/services/gbf-targets'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  return await getGbfTargets().catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'gbf-targets-list'
})
