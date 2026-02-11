import type { QueryParams } from '~~/types/api/query-params'
import { listArticles } from '~~/services/drupal'
import { fetchHandler } from '~~/server/utils/fetch-handler'

export default fetchHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listArticles({ sort, limit, skip })
})
