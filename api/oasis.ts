import ApiBase from 'api-client/api-base'
import { handleError } from 'api-client/api-error'
import { API_TIMEOUT } from '~~/constants/cache'
import type { OasisArticleQuery } from '~~/types/api/oasis'

export default class OasisApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      timeout: API_TIMEOUT,
      onResponseError: handleError
    })
  }

  async queryOasisArticle (adminTags: string[]): Promise<OasisArticleQuery | null> {
    const ag = encodeURIComponent(JSON.stringify([
      { $match: { adminTags: { $all: adminTags } } },
      { $sort: { 'meta.updatedOn': -1 } },
      { $limit: 1 }
    ]))
    const data = await this.fetch(`/api/v2017/articles?ag=${ag}`, { method: 'GET' })
    return data?.[0] ?? null
  }
}
