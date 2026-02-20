import { getContent } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return await getContent(url).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'content-item',
  getKey: (event) => {
    const { url } = getQuery(event) as { url: string }
    return url ?? ''
  }
})
