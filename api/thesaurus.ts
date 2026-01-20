import ApiBase from 'api-client/api-base'
import { handleError } from 'api-client/api-error'
import type { ThesaurusQuery } from '~~/types/api/thesaurus'

export default class ThesaurusApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      onResponseError: handleError // TODO: mix with api-base/concatInterceptors
    })
  }

  async queryThesaurus (domain: string): Promise<ThesaurusQuery[]> {
    const data = await this.fetch(`/api/v2013/thesaurus/domains/${encodeURIComponent(domain)}/terms`, { method: 'GET' })
    return data
  }
}
