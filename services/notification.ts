import { notFound } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape, andOr, toLString, toLStringArray } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Notification, NotificationList } from "../types/notification";

export default class NotificationService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async listNotifications(code?: string, sort?: string, rowsPerPage?: number, start?: number) : Promise<NotificationList> {

        const fieldQueries = andOr([
            'schema_s:notification',
            '_state_s:public',
            ...(code ? [`symbol_s:${solrEscape(code)}`] : [])
        ]);

        const params : SolrQuery = 
        {
            fieldQueries,
            query : "*:*",
            sort : sort || "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_t,url_ss,from_*_t,sender_t,themes_*_txt,createdDate_dt,updatedDate_dt,actionDate_dt,deadline_dt,reference_t, fulltext_*_t,recipient_txt",
            start: start || 0,
            rowsPerPage : rowsPerPage || 25,
        };
        const { response } = await this.api.querySolr(params);

        if(response.numFound == 0) {
            throw notFound("No notifications found.");
        }

        const notificationList: Notification[] = response.docs.map((item: any): Notification => ({
            id: item.id,
            code: item.symbol_s,
            title: toLString(item, "title"),
            urls: item.url_ss,
            themes: toLStringArray(item, "themes"),
            createdOn: new Date(item.createdDate_dt),
            endOn: new Date(item.endDate_dt),
            updatedOn: new Date(item.updatedDate_dt),
            actionOn: new Date(item.actionDate_dt),
            deadlineOn: new Date(item.deadline_dt),
            reference: item.reference_t,
            fulltext: toLString(item, "fulltext"),
            from: toLString(item, "from"),
            recipients: item.recipient_txt,
            sender: item.sender_t
        }));

        return {
            total: response.numFound,
            rows: notificationList
        };
    };

};