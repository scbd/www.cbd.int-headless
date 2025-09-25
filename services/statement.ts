import { badRequest, notFound } from "api-client/api-error";
import SolrIndexApi from "../api/solr-index";
import { solrEscape } from "../utils/solr";
import type { SolrQuery } from "../types/api/solr";
import type { Statement, StatementList } from "../types/statement";

export default class StatementService {

    private static api = new SolrIndexApi({
        baseURL: useRuntimeConfig().apiBaseUrl,
    });

    static async getStatement(statementCode: string, extraParams?: SolrQuery) : Promise<Statement> {
        if(!statementCode) {
            throw badRequest("Parameter statementCode is required.");
        };

        const params : SolrQuery = 
        {
            fieldQueries : `schema_s:statement AND symbol_s:${solrEscape(statementCode)} AND _state_s:public`,
            query : "*:*",
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,url_ss,themes_*_ss,createdDate_dt,updatedDate_dt",
            rowsPerPage : 1,
            ...extraParams
        };
        
        const response = await this.api.querySolr(params);
        
        if(response.response.numFound == 0) {
            throw notFound(`No statement found with statementCode: ${statementCode}`);
        };
        
        const [ data ] = response.response.docs;
        
        const statement : Statement = {
            id: data.id,
            statementCode: data.symbol_s,
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
            updatedDate: new Date(data.updatedDate_dt)
        };
                
        return statement;
    };

    static async listStatements(extraParams?: SolrQuery) : Promise<StatementList> {
        const params : SolrQuery = 
        {
            query : `schema_s:statement AND _state_s:public`,
            sort : "updatedDate_dt DESC",
            fields : "id,symbol_s,title_*_s,url_ss,themes_*_ss,createdDate_dt,updatedDate_dt",
            rowsPerPage : 25,
            ...extraParams
        };
        const response = await this.api.querySolr(params);
    
        if(response.response.numFound == 0) {
            throw notFound("No statements found.");
        }
    
        const statementList: StatementList = response.response.docs.map((item: any): Statement => ({
            id: item.id,
            statementCode: item.symbol_s,
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
            updatedDate: new Date(item.updatedDate_dt)
            }));
    
            statementList.push({
                total: response.response.numFound,
                start: response.response.start
            });
    
            return statementList;
        };
};