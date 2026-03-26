import ApiBase from 'api-client/api-base'
import { mandatory, handleError } from 'api-client/api-error'
import { API_TIMEOUT } from '~~/constants/cache'
export default class OasisApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      timeout: API_TIMEOUT,
      onResponseError: handleError
    })
  }
  async getNotification (notification: string): Promise<any> {
    if (notification === null || notification === '') throw mandatory('notification', 'Parameter notification is required.')

    const query = {
      q: JSON.stringify({ adminTags: { $all: ['notification', notification] } }),
      s: JSON.stringify({ 'meta.updatedOn': -1 }),
      fo: 1
    }
    const data = await this.fetch('/api/v2017/articles', { query })
    return data
  }
}