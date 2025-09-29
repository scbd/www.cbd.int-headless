import { notFound } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape, andOr, toLString, toLStringArray } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Meeting, MeetingList } from "../types/meeting";

export default class MeetingService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async listMeetings(code?: string, sort?: string, limit?: number, skip?: number) : Promise<MeetingList> {

        const fieldQueries = andOr([
            'schema_s:meeting',
            '_state_s:public',
            ...(code ? [`symbol_s:${solrEscape(code)}`] : [])
        ], "AND");

        const params : SolrQuery = 
        {
            fieldQueries,
            query : "*:*",
            sort : sort || "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,updatedDate_dt",
            start: skip || 0,
            rowsPerPage : limit || 25,
        };
        const { response } = await this.api.querySolr(params);

        if(response.numFound == 0) throw notFound("No meetings found.");

        const meetingList: Meeting[] = response.docs.map((item: any): Meeting => ({
            id: item.id,
            code: item.symbol_s,
            title: toLString(item, "title"),
            urls: item.url_ss,
            themes: toLStringArray(item, "themes"),
            startOn: new Date(item.startDate_dt),
            endOn: new Date(item.endDate_dt),
            updatedOn: new Date(item.updatedDate_dt),
            country: toLString(item, "eventCountry"),
            city: toLString(item, "eventCity")
        }));

        return {
            total: response.numFound,
            rows: meetingList
        };
    };
};