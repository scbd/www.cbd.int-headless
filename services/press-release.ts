import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString, toLStringArray, andOr } from '~~/utils/solr'
import { Cache } from '~~/utils/cache'
import { mandatory, notFound } from 'api-client/api-error'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { SolrQuery } from '~~/types/api/solr'
import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { getImage } from '~~/services/drupal'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const solrCache = new Cache({ name: 'pressReleaseCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
solrCache.startPurgeTimer()

export async function listPressReleases (options: QueryParams): Promise<SearchResult<PressRelease>> {
  return await searchPressReleases(options)
};

export async function getPressRelease (code: string): Promise<PressRelease> {
  if (code === null || code === '') throw mandatory('code', 'Press release code is required.')
  const data = await searchPressReleases({ code: normalizePressReleaseCode(code) })

  if (!data.rows.length) throw notFound(`Press release '${code}' not found.`)
  return data.rows[0] as PressRelease
};

async function searchPressReleases (options?: QueryParams & { code?: string }): Promise<SearchResult<PressRelease>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const fqParts: string[] = ['schema_s:pressRelease']
  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }
  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query,
    fieldQueries,
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,symbol_s,code_s,title_*_t,url_ss,themes_*_txt,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  const cached = solrCache.get<SearchResult<PressRelease>>(cacheKey)
  if (cached !== null) return cached

  const { response } = await api.querySolr(params)

  const results = await Promise.allSettled(response.docs.map(async (item: any): Promise<PressRelease> => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    themes: toLStringArray(item, 'themes'),
    image: await (async () => {
      try {
        return await getImage(item.symbol_s, 'press_releases')
      } catch {
        return DEFAULT_IMAGE
      }
    })(),
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  })))

  const pressReleaseList = results
    .filter((r): r is PromiseFulfilledResult<PressRelease> => r.status === 'fulfilled')
    .map(r => r.value)

  const result = { total: response.numFound, rows: pressReleaseList }
  return solrCache.set(cacheKey, result)
}

function normalizePressReleaseCode (code: string): string {
  return code.toUpperCase()
}
