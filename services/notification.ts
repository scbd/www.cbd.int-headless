import { badRequest, notFound } from "api-client/api-error";
import SolrIndexAPI from "../api/solr-index";
import { solrEscape } from "../utils/solr";
import { SolrQuery } from "../types/api/solr";
import { Notification, NotificationList } from "../types/notification";

export default class NotificationService {

    private static api = new SolrIndexAPI({
        apiBaseUrl: useRuntimeConfig().apiBaseUrl as string
    });

    static async getNotification(notificationCode: string, extraParams?: SolrQuery) : Promise<Notification> {
        if(!notificationCode) {
            throw badRequest("Parameter notificationCode is required.");
        };

        const params : SolrQuery = 
        {
            query : `schema_s:notification AND symbol_s:${solrEscape(notificationCode)} AND _state_s:public`,
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,url_ss,from_*_s,sender_s,themes_*_ss,createdDate_dt,updatedDate_dt,actionDate_dt,deadline_dt,reference_s, fulltext_*_s,recipient_ss",
            rowsPerPage : 1,
            ...extraParams
        };
        const response = await this.api.querySolr(params);

        if(response.response.numFound == 0) {
            throw notFound(`No notifications found with notificationCode: ${notificationCode}`);
        };

        const [ data ] = response.response.docs;

        const notification : Notification = {
            id: data.id,
            notificationCode: data.symbol_s,
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
            createdDate: new Date(data.createdDate_dt),
            endDate: new Date(data.endDate_dt),
            updatedDate: new Date(data.updatedDate_dt),
            actionDate: new Date(data.actionDate_dt),
            deadlineDate: new Date(data.deadline_dt),
            reference: data.reference_s,
            fulltext: {
                en: data.fulltext_EN_s,
                fr: data.fulltext_FR_s,
                es: data.fulltext_ES_s,
                ru: data.fulltext_RU_s,
                zh: data.fulltext_ZH_s,
                ar: data.fulltext_AR_s
            },
            from: {
                en: data.from_EN_s,
                fr: data.from_FR_s,
                es: data.from_ES_s,
                ru: data.from_RU_s,
                zh: data.from_ZH_s,
                ar: data.from_AR_s
            },
            recipient: data.recipient_ss,
            sender: data.sender_s
        };
        
        return notification;
    };

    static async listNotifications(extraParams?: SolrQuery) : Promise<NotificationList> {
        const params : SolrQuery = 
        {
            query : `schema_s:notification AND _state_s:public`,
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,url_ss,from_*_s,sender_s,themes_*_ss,createdDate_dt,updatedDate_dt,actionDate_dt,deadline_dt,reference_s, fulltext_*_s,recipient_ss",
            rowsPerPage : 25,
            ...extraParams
        };
        const response = await this.api.querySolr(params);

        if(response.response.numFound == 0) {
            throw notFound("No notifications found.");
        }

        const notificationList: NotificationList = response.response.docs.map((item: any): Notification => ({
            id: item.id,
            notificationCode: item.symbol_s,
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
            createdDate: new Date(item.createdDate_dt),
            endDate: new Date(item.endDate_dt),
            updatedDate: new Date(item.updatedDate_dt),
            actionDate: new Date(item.actionDate_dt),
            deadlineDate: new Date(item.deadline_dt),
            reference: item.reference_s,
            fulltext: {
                en: item.fulltext_EN_s,
                fr: item.fulltext_FR_s,
                es: item.fulltext_ES_s,
                ru: item.fulltext_RU_s,
                zh: item.fulltext_ZH_s,
                ar: item.fulltext_AR_s
            },
            from: {
                en: item.from_EN_s,
                fr: item.from_FR_s,
                es: item.from_ES_s,
                ru: item.from_RU_s,
                zh: item.from_ZH_s,
                ar: item.from_AR_s
            },
            recipient: item.recipient_ss,
            sender: item.sender_s
        }));

        notificationList.push({
            total: response.response.numFound,
            start: response.response.start
        });

        return notificationList;
    };

};