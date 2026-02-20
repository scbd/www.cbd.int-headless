import { getGbfTargets } from '~~/services/gbf-targets'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  return await getGbfTargets().catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'gbf-targets-list'
})
