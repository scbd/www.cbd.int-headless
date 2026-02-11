import { getContent } from '~~/services/drupal'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return await getContent(url)
})
