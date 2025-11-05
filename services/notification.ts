import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, toLString, toLStringArray } from '../utils/solr'
import type { SolrQuery } from '../types/api/solr'
import type { Notification, NotificationList, NotificationOptions } from '../types/notification'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getNotification (code: string): Promise<Notification> {
  if (code == null || code === '') throw mandatory('code', 'Notification code is required.')
  const data = await searchNotifications({ code })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Notification '${code}' not found.`)
  return data.rows[0] as Notification
};

export async function listNotifications (options: NotificationOptions): Promise<NotificationList> {
  return await searchNotifications(options)
}

async function searchNotifications (options?: NotificationOptions & { code?: string }): Promise<NotificationList> {
  const query = options?.code != null && options.code !== '' ? `symbol_s:${solrEscape(options?.code)}` : '*.*'

  const params: SolrQuery =
    {
      query,
      fieldQueries: 'schema_s:notification',
      sort: options?.sort ?? 'updatedDate_dt DESC',
      fields: 'id,symbol_s,title_*_t,url_ss,from_*_t,sender_t,themes_*_txt,createdDate_dt,updatedDate_dt,actionDate_dt,deadline_dt,reference_t, fulltext_*_t,recipient_txt',
      start: options?.skip ?? 0,
      rowsPerPage: options?.limit ?? 25
    }
  const { response } = await api.querySolr(params)

  const notificationList: Notification[] = response.docs.map((item: any): Notification => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    themes: toLStringArray(item, 'themes'),
    createdOn: new Date(item.createdDate_dt),
    endOn: new Date(item.endDate_dt),
    updatedOn: new Date(item.updatedDate_dt),
    actionOn: new Date(item.actionDate_dt),
    deadlineOn: new Date(item.deadline_dt),
    reference: item.reference_t,
    fulltext: toLString(item, 'fulltext'),
    from: toLString(item, 'from'),
    recipients: item.recipient_txt,
    sender: item.sender_t
  }))

  return {
    total: response.numFound,
    rows: notificationList
  }
}
