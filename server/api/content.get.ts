import { getContent } from '~~/services/drupal'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return await getContent(url)
})
