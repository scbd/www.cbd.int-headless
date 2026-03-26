import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString, toLStringArray, andOr, normalizeCode } from '~~/utils/solr'
import { getImage } from '~~/services/drupal'
import { Cache } from '~~/utils/cache'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { SolrQuery } from '~~/types/api/solr'
import type { Notification, Submission } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const solrCache = new Cache({ name: 'notificationCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
solrCache.startPurgeTimer()

export async function getNotification (code: string): Promise<Notification> {
  if (code === null || code === '') throw mandatory('code', 'Notification code is required.')
  const data = await searchNotification({ code: normalizeCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Notification '${code}' not found.`)
  return data.rows[0] as Notification
};

export async function listNotifications (options: QueryParams): Promise<SearchResult<Notification>> {
  return await searchNotification(options)
}

async function searchNotification (options?: QueryParams & { code?: string }): Promise<SearchResult<Notification>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const fqParts: string[] = ['schema_s:notification']
  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }

  if (options?.startDate || options?.endDate) {
    const from = options.startDate ?? '*'
    const to   = options.endDate   ?? '*'
    fqParts.push(`createdDate_dt:[${from} TO ${to}]`)
  }

  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query,
    fieldQueries,
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,symbol_s,title_*_t,url_ss,files_ss,from_*_t,sender_t,themes_*_txt,createdDate_dt,updatedDate_dt,actionDate_dt,deadline_dt,reference_s, fulltext_*_t,recipient_txt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  return solrCache.getOrFetch(cacheKey, async () => {
    const { response } = await api.querySolr(params)

    const notificationList: Notification[] = await Promise.all(response.docs.map(async (item: any): Promise<Notification> => ({
      id: item.id,
      code: item.symbol_s,
      title: toLString(item, 'title'),
      urls: item.url_ss,
      file: (() => {
        try {
          const parsed = JSON.parse(item.files_ss?.[0])
          const f = parsed?.[0]
          if (f === undefined || f === null) return null
          return { url: f.url, language: f.language, type: f.type }
        } catch {
          return null
        }
      })(),
      themes: toLStringArray(item, 'themes'),
      createdOn: new Date(item.createdDate_dt),
      endOn: new Date(item.endDate_dt),
      updatedOn: new Date(item.updatedDate_dt),
      actionOn: new Date(item.actionDate_dt),
      deadlineOn: new Date(item.deadline_dt),
      reference: item.reference_s,
      fulltext: toLString(item, 'fulltext'),
      from: toLString(item, 'from'),
      recipients: item.recipient_txt,
      sender: item.sender_t,
      image: await (async () => {
        try {
          return await getImage(item.symbol_s, 'notifications')
        } catch {
          return DEFAULT_IMAGE
        }
      })()
    })))

    return { total: response.numFound, rows: notificationList }
  })
}

export async function listSubmissions (options: QueryParams & { code?: string }): Promise<SearchResult<Submission>> {
  return await searchSubmission(options)
}

async function searchSubmission (options?: QueryParams & { code?: string }): Promise<SearchResult<Submission>> {
  const query = options?.code !== undefined && options.code !== '' ? `notifications_ss:${solrEscape(options.code)}` : '*.*'

  const fqParts: string[] = ['schema_s:submission']
  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }
  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query,
    fieldQueries,
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,title_t,government_t,url_ss,documents_ss,notifications_ss,submittedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  return solrCache.getOrFetch(cacheKey, async () => {
    const { response } = await api.querySolr(params)

    const submissionList: Submission[] = response.docs.map((item: any): Submission => ({
      id: item.id,
      title: item.title_t,
      government: item.government_t,
      notifications: item.notifications_ss,
      urls: item.url_ss,
      files: item.documents_ss,
      submittedDate: new Date(item.submittedDate_dt)
    }))

    return { total: response.numFound, rows: submissionList }
  })
}