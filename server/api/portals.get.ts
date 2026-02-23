import { getPortal } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return getPortal(portal).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'portals-item',
  getKey: (event) => {
    const { portal } = getQuery(event) as { portal: string }
    return portal ?? ''
  }
})
