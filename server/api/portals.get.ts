import { Portal } from '~~/types/portal'
import DrupalService from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const { portal } = getQuery(event) as { portal: string }
  return await DrupalService.getPortal(portal) as Portal[]
})
