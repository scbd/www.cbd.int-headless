import { getContent } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default apiFetchHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return await getContent(url).catch(apiErrorHandler)
})
