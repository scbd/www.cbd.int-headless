import { getGbfTargets } from '~~/services/gbf-targets'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  return await getGbfTargets()
})
