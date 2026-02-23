import { getContent } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'
import { CACHE_DURATION_S } from '~~/constants/cache'

export default cachedEventHandler(async (event) => {
  const { url } = getQuery(event) as { url: string }
  return getContent(url).catch(apiErrorHandler)
}, {
  maxAge: CACHE_DURATION_S,
  name: 'content-item',
  getKey: (event) => {
    const { url } = getQuery(event) as { url: string }
    return url ?? ''
  }
})
