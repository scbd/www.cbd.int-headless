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
  const queryParts: string[] = []
  if (options?.query != null) {
    const queries = Array.isArray(options.query) ? options.query : [options.query]
    queryParts.push(...queries.filter(q => q !== ''))
  }
  const query = queryParts.length > 0 ? andOr(queryParts, 'AND') : '*.*'

  const fqParts: string[] = ['schema_s:calendarActivity AND _state_s:public']
  if (options?.fieldQueries != null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }
  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
      query,
      fieldQueries,
      sort: options?.sort ?? 'startDateCOA_dt ASC',
      fields: 'id,identifier_s,actionRequiredByParties_b,title_*_t,url_ss,startDateCOA_dt,endDateCOA_dt,createdDate_dt,updatedDate_dt',
      start: options?.skip ?? 0,
      rowsPerPage: options?.limit ?? 10
  }

  const { response } = await api.querySolr(params)

  const activityList: CalendarActivity[] = response.docs.map(
      (item: any): CalendarActivity => ({
          id: item.identifier_s,
          title: toLString(item, 'title'),
          url: item.url_ss?.[0] ?? `/calendar-of-activities-and-actions?autoExpand=${item.identifier_s}`,
          actionRequiredByParties: item.actionRequiredByParties_b ?? false,
          startDate: item.startDateCOA_dt != null ? new Date(item.startDateCOA_dt) : null,
          endDate: item.endDateCOA_dt != null ? new Date(item.endDateCOA_dt) : null,
          createdOn: new Date(item.createdDate_dt),
          updatedOn: new Date(item.updatedDate_dt)
      })
  )

  return {
    total: response.numFound,
    rows: activityList
  }
}
