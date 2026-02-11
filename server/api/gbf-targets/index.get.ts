import { getGbfTargets } from '~~/services/gbf-targets'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  return await getGbfTargets()
})
