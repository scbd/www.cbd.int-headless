import { getGbfTargets } from '~~/services/gbfTargets'

export default defineEventHandler(async (event) => {
  return await getGbfTargets()
})
