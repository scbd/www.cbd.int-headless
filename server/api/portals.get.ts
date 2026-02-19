import { getPortal } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return await getPortal(portal).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'portals-item'
})
