import DrupalService from '../../services/drupal'
import type { QueryParams } from '../../types/api/query-params'
import type { Article } from '../../types/content'

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams
  return await DrupalService.listArticles({ sort, limit, skip })
})
