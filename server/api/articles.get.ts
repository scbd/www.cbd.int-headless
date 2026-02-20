import type { QueryParams } from '~~/types/api/query-params'
import { listArticles } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listArticles({ sort, limit, skip }).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'articles-list',
  getKey: (event) => {
    const { sort, limit, skip } = getQuery(event) as QueryParams
    return `${sort ?? ''}-${String(limit ?? '')}-${String(skip ?? '')}`
  }
})
