import { getPortal } from '~~/services/drupal'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return await getPortal(portal)
})
