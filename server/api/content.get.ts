import { getContent } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default fetchHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return await getContent(url).catch(apiErrorHandler)
})
