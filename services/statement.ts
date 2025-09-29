import { notFound } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape, andOr, toLString, toLStringArray  } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Statement, StatementList } from "../types/statement";

export default class StatementService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async listStatements(code?: string, sort?: string, rowsPerPage?: number, start?: number) : Promise<StatementList> {
        
        const fieldQueries = andOr([
            'schema_s:statement',
            '_state_s:public',
            ...(code ? [`symbol_s:${solrEscape(code)}`] : [])
        ]);
        
        const params : SolrQuery = 
        {
            fieldQueries,
            query : "*:*",
            sort : sort || "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_t,url_ss,themes_*_txt,createdDate_dt,updatedDate_dt",
            start: start || 0,
            rowsPerPage : rowsPerPage || 25,
        };
        const { response } = await this.api.querySolr(params);
        
        if(response.numFound == 0) {
            throw notFound("No statements found.");
        }
            
        const statementList: Statement[] = response.docs.map((item: any): Statement => ({
            id: item.id,
            code: item.symbol_s,
            title: toLString(item, "title"),
            urls: item.url_ss,
            themes: toLStringArray(item, "themes"),
            createdOn: new Date(item.createdDate_dt),
            updatedOn: new Date(item.updatedDate_dt)
        }));
    
        return {
            total: response.numFound,
            rows: statementList
        };
    };
};