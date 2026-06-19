import OasisApi from '~~/api/oasis'
import { Cache } from '~~/utils/cache'
import { mandatory, notFound } from 'api-client/api-error'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { OasisArticleQuery } from '~~/types/api/oasis'

const api = new OasisApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const cache = new Cache({ name: 'oasisCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
cache.startPurgeTimer()

export async function getOasisArticle (category: string, code: string): Promise<OasisArticleQuery> {
  if (category === null || category === '') throw mandatory('category', 'Category is required.')
  if (code === null || code === '') throw mandatory('code', 'Code is required.')

  const cacheKey = `oasis-${category}:${code}`
  const article = await cache.getOrFetch(cacheKey, async () => {
    const item = await api.queryOasisArticle(category, code)
    if (item == null) return null

    return {
      _id: item._id,
      content: item.content,
      title: item.title
    }
  })

  if (article == null) throw notFound(`Article '${category}/${code}' not found.`)
  return article
}
