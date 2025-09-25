import { notFound, mandatory } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape, toLString, toLStringArray } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Meeting, MeetingList } from "../types/meeting";
import lstring from "api-client/types/lstring";

export default class MeetingService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async listMeetings(meetingCode?: string, sort?: string, rowsPerPage?: number, start?: number) : Promise<MeetingList> {
        const fieldQueries = `schema_s:meeting AND _state_s:public` + (meetingCode ? ` AND symbol_s:${solrEscape(meetingCode)}` : "");
           
        const params : SolrQuery = 
        {
            fieldQueries,
            query : "*:*",
            sort : sort || "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,updatedDate_dt",
            start: start || 0,
            rowsPerPage : rowsPerPage || 25,
        };
        const { response } = await this.api.querySolr(params);

        if(response.numFound == 0) {
            throw notFound("No meetings found.");
        }

        const meetingList: Meeting[] = response.docs.map((item: any): Meeting => ({
            id: item.id,
            meetingCode: item.symbol_s,
            title: toLString(item, "title"),
            url: item.url_ss,
            themes: toLStringArray(item, "themes"),
            startOn: new Date(item.startDate_dt),
            endOn: new Date(item.endDate_dt),
            updatedOn: new Date(item.updatedDate_dt),
            country: toLString(item, "eventCountry") as lstring,
            city: toLString(item, "eventCity") as lstring
        }));

        return {
            total: response.numFound,
            rows: meetingList
        }
    };
};