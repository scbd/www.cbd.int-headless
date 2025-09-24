import { badRequest, notFound } from "api-client/api-error";
import SolrIndexAPI from "../api/solr-index";
import { solrEscape } from "../utils/solr";
import { SolrQuery } from "../types/api/solr";
import { Meeting, MeetingList } from "../types/meeting";

export default class MeetingService {

    private static api = new SolrIndexAPI({
        apiBaseUrl: useRuntimeConfig().apiBaseUrl as string
    });

    static async getMeeting(meetingCode: string, extraParams?: SolrQuery) : Promise<Meeting> {
        if(!meetingCode) {
            throw badRequest("Parameter meetingCode is required.");
        };

        const params : SolrQuery = 
        {
            query : `schema_s:meeting AND symbol_s:${solrEscape(meetingCode)} AND status_s:CONFIRM`,
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,eventCountry_*_s,eventCity_*_s,url_ss,themes_*_ss,startDate_dt,endDate_dt,updatedDate_dt",
            rowsPerPage : 1,
            ...extraParams
        };
        const response = await this.api.querySolr(params);

        if(response.response.numFound == 0) {
            throw notFound(`No meetings found with meetingCode: ${meetingCode}`);
        };

        const [ data ] = response.response.docs;

        const meeting : Meeting = {
            id: data.id,
            meetingCode: data.symbol_s,
            title: {
                en: data.title_EN_s,
                fr: data.title_FR_s,
                es: data.title_ES_s,
                ru: data.title_RU_s,
                zh: data.title_ZH_s,
                ar: data.title_AR_s
            },
            url: data.url_ss,
            themes: {
                en: data.themes_EN_ss,
                fr: data.themes_FR_ss,
                es: data.themes_ES_ss,
                ru: data.themes_RU_ss,
                zh: data.themes_ZH_ss,
                ar: data.themes_AR_ss
            },
            startDate: new Date(data.startDate_dt),
            endDate: new Date(data.endDate_dt),
            updatedDate: new Date(data.updatedDate_dt),
            country: {
                en: data.eventCountry_EN_s,
                fr: data.eventCountry_FR_s,
                es: data.eventCountry_ES_s,
                ru: data.eventCountry_RU_s,
                zh: data.eventCountry_ZH_s,
                ar: data.eventCountry_AR_s
            },
            city: {
                en: data.eventCity_EN_s,
                fr: data.eventCity_FR_s,
                es: data.eventCity_ES_s,
                ru: data.eventCity_RU_s,
                zh: data.eventCity_ZH_s,
                ar: data.eventCity_AR_s
            }
        };

        return meeting;
    };

    static async listMeetings(extraParams?: SolrQuery) : Promise<MeetingList> {
        const params : SolrQuery = 
        {
            query : `schema_s:meeting AND status_s:CONFIRM`,
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,eventCountry_*_s,eventCity_*_s,url_ss,themes_*_ss,startDate_dt,endDate_dt,updatedDate_dt",
            rowsPerPage : 25,
            ...extraParams
        };
        const response = await this.api.querySolr(params);

        if(response.response.numFound == 0) {
            throw notFound("No meetings found.");
        }

        const meetingList: MeetingList = response.response.docs.map((item: any): Meeting => ({
            id: item.id,
            meetingCode: item.symbol_s,
            title: {
                en: item.title_EN_s,
                fr: item.title_FR_s,
                es: item.title_ES_s,
                ru: item.title_RU_s,
                zh: item.title_ZH_s,
                ar: item.title_AR_s
            },
            url: item.url_ss,
            themes: {
                en: item.themes_EN_ss,
                fr: item.themes_FR_ss,
                es: item.themes_ES_ss,
                ru: item.themes_RU_ss,
                zh: item.themes_ZH_ss,
                ar: item.themes_AR_ss
            },
            startDate: new Date(item.startDate_dt),
            endDate: new Date(item.endDate_dt),
            updatedDate: new Date(item.updatedDate_dt),
            country: {
                en: item.eventCountry_EN_s,
                fr: item.eventCountry_FR_s,
                es: item.eventCountry_ES_s,
                ru: item.eventCountry_RU_s,
                zh: item.eventCountry_ZH_s,
                ar: item.eventCountry_AR_s
            },
            city: {
                en: item.eventCity_EN_s,
                fr: item.eventCity_FR_s,
                es: item.eventCity_ES_s,
                ru: item.eventCity_RU_s,
                zh: item.eventCity_ZH_s,
                ar: item.eventCity_AR_s
            }
        }));

        meetingList.push({
            total: response.response.numFound,
            start: response.response.start
        });

        return meetingList;
    };
};