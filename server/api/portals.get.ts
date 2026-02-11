import { getPortal } from '~~/services/drupal'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return await getPortal(portal)
})
