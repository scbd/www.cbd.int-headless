import { getGbfTargets } from '~~/services/gbf-targets'

export default defineEventHandler(async (event) => {
  return await getGbfTargets()
})
