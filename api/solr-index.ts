import ApiBase from "api-client/api-base";
import { handleError } from "api-client/api-error";
import { SolrQuery } from "../types/api/solr";
import { Api } from "../types/api/api";
import { localizeFields } from "../utils/string";

export default class SolrIndexAPI extends ApiBase {

    constructor( config: Api ) {
        super({
            ...config,
            baseURL: config.apiBaseUrl,
            onResponseError: handleError
        })
    };

    async querySolr(params: SolrQuery) {

        const defaults = {
            fieldQueries: [],
            searchField : 'text_EN_txt',
            start : 0, rowsPerPage : 25
        };

        params = {...defaults, ...params };

        var queryListParameters = {
            df    : params.searchField,
            fq    : params.fieldQueries,
            q     : params.query,
            sort  : localizeFields(params.sort),
            fl    : localizeFields(params.fields),
            wt    : "json",
            start : params.start,
            rows  : params.rowsPerPage,
        };

        const data = await this.fetch(`/api/v2013/index/select`, { method : "POST", body : queryListParameters });
        return data;
    };

};