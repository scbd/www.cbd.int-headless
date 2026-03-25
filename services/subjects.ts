import ThesaurusApi from '~~/api/thesaurus'
import { Cache } from '~~/utils/cache'
import { mandatory, notFound } from 'api-client/api-error'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { ThesaurusQuery } from '~~/types/api/thesaurus'
import type { Subject } from '~~/types/subject'

const api = new ThesaurusApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const cache = new Cache({ name: 'subjectCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
cache.startPurgeTimer()

export async function getSubjects (domain: string): Promise<Subject[]> {
  if (domain === null || domain === '') throw mandatory('domain', 'Subject domain is required.')

  return await cache.getOrFetch(domain, async () => {
    const response = await api.queryThesaurus(domain)

    if (response === undefined || response === null) throw notFound(response)

    return response.map((item: ThesaurusQuery): Subject => ({
      identifier: item.identifier,
      title: item.title ?? {},
      shortTitle: item.shortTitle ?? {}
    }))
  })
}
