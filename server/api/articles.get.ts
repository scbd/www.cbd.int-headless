import type { QueryParams } from '~~/types/api/query-params'
import { listArticles } from '~~/services/drupal'
import { apiFetchHandler } from '~~/server/utils/api-fetch-handler'

export default apiFetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listArticles({ sort, limit, skip })
})
