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

export async function getOasisArticle (adminTags: string[]): Promise<OasisArticleQuery> {
  if (adminTags.length === 0) throw mandatory('adminTags', 'At least one admin tag is required.')

  const cacheKey = `oasis-${adminTags.sort().join(':')}`
  return await cache.getOrFetch(cacheKey, async () => {
    const item = await api.queryOasisArticle(adminTags)
    if (item == null) throw notFound(`Article '${adminTags.sort().join('/')}' not found.`)

    return {
      _id: item._id,
      content: item.content,
      title: item.title
    }
  })
}
