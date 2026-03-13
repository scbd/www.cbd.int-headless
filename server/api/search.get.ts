import type { QueryParams } from '~~/types/api/query-params'
import type { Content } from '~~/types/content'
import { listArticles, listPages } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { sort, limit = 10, skip = 0, search } = getQuery(event) as QueryParams

  const [articles, pages] = await Promise.all([
    listArticles({ sort, search, limit: Number(limit), skip: Number(skip) }),
    listPages({ sort, search, limit: Number(limit), skip: Number(skip) }),
  ]).catch(apiErrorHandler)

  const merged: Content[] = [...articles.rows, ...pages.rows]

  const sortField = (sort?.replace(/^-/, '') || 'createdOn') as keyof Content
  const sortDir = sort?.startsWith('-') ? -1 : 1

  merged.sort((a, b) => {
    const aVal = new Date(a[sortField] as string | Date).getTime()
    const bVal = new Date(b[sortField] as string | Date).getTime()
    return sortDir * (aVal - bVal)
  })

  return {
    rows: merged,
    total: articles.total + pages.total,
  }
})
