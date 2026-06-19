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

  async queryOasisArticle (category: string, code: string): Promise<OasisArticleQuery | null> {
    const q = encodeURIComponent(JSON.stringify({ adminTags: { $all: [category, code] } }))
    const s = encodeURIComponent(JSON.stringify({ 'meta.updatedOn': -1 }))
    const data = await this.fetch(`/api/v2017/articles?q=${q}&s=${s}&fo=1`, { method: 'GET' })
    return data ?? null
  }
}
