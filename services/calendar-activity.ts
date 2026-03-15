import SolrIndexApi from '~~/api/solr-index'
import { toLString, andOr } from '~~/utils/solr'
import type { SolrQuery } from '~~/types/api/solr'
import type { CalendarActivity } from '~~/types/calendar-activity'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function listCalendarActivities (options: QueryParams): Promise<SearchResult<CalendarActivity>> {
  return await searchCalendarActivities(options)
}

async function searchCalendarActivities (options?: QueryParams): Promise<SearchResult<CalendarActivity>> {
  const fqParts: string[] = ['schema_s:calendarActivity']
  if (options?.fieldQueries != null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }
  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query: '*.*',
    fieldQueries,
    sort: options?.sort ?? 'startDate_dt ASC',
    fields: 'id,title_*_t,url_ss,startDate_dt,endDate_dt,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const { response } = await api.querySolr(params)

  const activityList: CalendarActivity[] = response.docs.map((item: any): CalendarActivity => ({
    id: item.id,
    title: toLString(item, 'title'),
    url: item.url_ss?.[0] ?? null,
    startDate: item.startDate_dt != null ? new Date(item.startDate_dt) : null,
    endDate: item.endDate_dt != null ? new Date(item.endDate_dt) : null,
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  }))

  return {
    total: response.numFound,
    rows: activityList
  }
}
