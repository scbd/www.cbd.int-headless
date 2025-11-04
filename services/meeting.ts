import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, toLString, toLStringArray } from '../utils/solr'
import type { SolrQuery } from '../types/api/solr'
import type { Meeting, MeetingList, MeetingOptions } from '../types/meeting'

function normalizeMeetingCode (code: string): string {
  return code.toUpperCase()
};
export default class MeetingService {
  private static readonly api = new SolrIndexApi({
    baseURL: useRuntimeConfig().apiBaseUrl
  })

  static async getMeeting (code: string): Promise<Meeting> {
    if (!code) throw mandatory('code', 'Meeting code is required.')
    const data = await this.searchMeetings({ code: normalizeMeetingCode(code) })

    if (data.total === 0) throw notFound(`Meeting '${code}' not found.`)
    return data.rows[0]
  };

  static async listMeetings (options: MeetingOptions): Promise<MeetingList> {
    return await this.searchMeetings(options)
  };

  private static async searchMeetings (options?: MeetingOptions & { code?: string }): Promise<MeetingList> {
    const query = options?.code ? `symbol_s:${solrEscape(options?.code)}` : '*.*'

    const params: SolrQuery =
        {
          query,
          fieldQueries: 'schema_s:meeting',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 25
        }
    const { response } = await this.api.querySolr(params)

    const meetingList: Meeting[] = response.docs.map((item: any): Meeting => ({
      id: item.id,
      code: item.symbol_s,
      title: toLString(item, 'title'),
      urls: item.url_ss,
      themes: toLStringArray(item, 'themes'),
      startOn: new Date(item.startDate_dt),
      endOn: new Date(item.endDate_dt),
      updatedOn: new Date(item.updatedDate_dt),
      country: toLString(item, 'eventCountry'),
      city: toLString(item, 'eventCity')
      // imageUrl: MeetingService.getImageUrl(item),
      /**
             * FOR @DevDrupal ONLY; WILL BE REMOVED SOON
             *  TODO: implement image handling when available
             */
    }))

    return {
      total: response.numFound,
      rows: meetingList
    }
  };

  /**
     * TODO: implement image handling when available
     * FOR @DevDrupal ONLY; WILL BE REMOVED SOON
     * @see https://github.com/scbd/www.cbd.int-headless/pull/10#discussion_r2437169504
     */
  private static getImageUrl (meeting: Meeting) {

  }
};
