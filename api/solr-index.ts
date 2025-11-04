import ApiBase from 'api-client/api-base'
import { handleError } from 'api-client/api-error'
import type { SolrQuery } from '../types/api/solr'
import { localizeFields } from '../utils/solr'

export default class SolrIndexApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      onResponseError: handleError // TODO: mix with api-base/concatInterceptors
    })
  };

  async querySolr (params: SolrQuery) {
    const defaults = {
      fieldQueries: '',
      searchField: 'text_EN_txt',
      start: 0,
      rowsPerPage: 25
    }

    params = { ...defaults, ...params }

    const queryListParameters = {
      df: params.searchField,
      fq: params.fieldQueries,
      q: params.query,
      sort: localizeFields(params.sort || ''),
      fl: localizeFields(params.fields || ''),
      wt: 'json',
      start: params.start,
      rows: params.rowsPerPage
    }

    const data = await this.fetch('/api/v2013/index/select', { method: 'POST', body: queryListParameters })
    return data
  };
};
