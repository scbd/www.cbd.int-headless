import { badRequest, notFound } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape,toLString, toLStringArray  } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Statement, StatementList } from "../types/statement";

export default class StatementService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async listStatements(statementCode?: string, sort?: string, rowsPerPage?: number, start?: number) : Promise<StatementList> {
        const fieldQueries = `schema_s:statement AND _state_s:public` + (statementCode ? ` AND symbol_s:${solrEscape(statementCode)}` : "");
        
        const params : SolrQuery = 
        {
            fieldQueries,
            query : "*:*",
            sort : sort || "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_t,url_txt,themes_*_txt,createdDate_dt,updatedDate_dt",
            start: start || 0,
            rowsPerPage : rowsPerPage || 25,
        };
        const { response } = await this.api.querySolr(params);
        
        if(response.numFound == 0) {
            throw notFound("No statements found.");
        }
            
        const statementList: Statement[] = response.docs.map((item: any): Statement => ({
            id: item.id,
            statementCode: item.symbol_s,
            title: toLString(item, "title"),
            url: item.url_txt,
            themes: toLStringArray(item, "themes"),
            createdOn: new Date(item.createdDate_dt),
            updatedOn: new Date(item.updatedDate_dt)
        }));
    
        return {
            total: response.numFound,
            rows: statementList
        }
    };
};