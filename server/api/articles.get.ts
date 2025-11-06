import type { QueryParams } from '../../types/api/query-params'
import { listArticles } from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await listArticles({ sort, limit, skip })
})
