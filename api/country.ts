import ApiBase from 'api-client/api-base'
import { handleError } from 'api-client/api-error'
import type { Country } from '~~/types/country'

export default class CountryApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      onResponseError: handleError
    })
  }

  async getCountries (): Promise<Country[]> {
    const data = await this.fetch('/api/v2015/countries', { method: 'GET' })
    return data
  }
}
