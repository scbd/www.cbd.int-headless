import { getPortal } from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return await getPortal(portal)
})
