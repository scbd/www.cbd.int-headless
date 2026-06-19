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
    const data = await this.fetch(`/api/v2017/articles?q={"adminTags":{"$all":["${encodeURI(category)}","${encodeURI(code)}"]}}&s={"meta.updatedOn":-1}&fo=1`, { method: 'GET' })
    return data ?? null
  }
}
