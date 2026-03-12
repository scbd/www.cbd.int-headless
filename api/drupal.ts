import ApiBase from 'api-client/api-base'
import type { Image } from '~~/types/image'
import { mandatory, handleError } from 'api-client/api-error'
export default class DrupalApi extends ApiBase {
  constructor (options: { baseURL: string }) {
    super({
      ...options,
      onResponseError: handleError
    })
  };

  async getRoute (path: string): Promise<any> {
    if (path === null || path === '') throw mandatory('path', 'Parameter path is required.')

    const query = { path }
    const data = await this.fetch('/router/translate-path', { query })
    return data
  };

  async getContent (id: string, type: string): Promise<any> {
    if (id === null || id === '') throw mandatory('id', 'Parameter id is required.')
    if (type === null || type === '') throw mandatory('type', 'Parameter type is required.')

    const data = await this.fetch(`/jsonapi/node/${encodeURIComponent(type)}/${encodeURIComponent(id)}`)
    return data
  };

  async getMedia (id: string): Promise<any> {
    if (id === null || id === '') throw mandatory('id', 'Parameter id is required.')

    const data = await this.fetch(`/jsonapi/file/file/${encodeURIComponent(id)}`)
    return data
  };

  async getImage (id: string, category: Image['category']): Promise<any> {
    if (id === null || id === '') throw mandatory('id', 'Parameter id is required.')
    if (category === null) throw mandatory('category', 'Parameter category is required.')

    const data = await this.fetch(`/jsonapi/media/${encodeURIComponent(category)}?filter[name][value]=${encodeURIComponent(id)}&include=field_media_image`)
    return data
  }

  async getMenu (menu: string): Promise<any> {
    if (menu === null || menu === '') throw mandatory('menu', 'Parameter menu is required.')

    const { data } = await this.fetch(`/jsonapi/menu_items/${encodeURIComponent(menu)}`)
    return data
  };

  async listArticles (options?: { sort?: string, limit?: number, skip?: number, search?: string }): Promise<{ data: any[], total: number }> {
    const query: Record<string, any> = {
      sort: options?.sort ?? '-promote,-changed,-created',
      'page[limit]': options?.limit ?? 10,
      'page[offset]': options?.skip ?? 0
    }

    if (options?.search) {
      query['filter[title][operator]'] = 'CONTAINS'
      query['filter[title][value]'] = options.search
    }

    const response = await this.fetch('/jsonapi/node/article', { query })
    return { data: response.data, total: response.meta?.count ?? response.data.length }
  }

  async listPages (options?: { sort?: string, limit?: number, skip?: number, search?: string }): Promise<{ data: any[], total: number }> {
    const query: Record<string, any> = {
      sort: options?.sort ?? '-changed',
      'page[limit]': options?.limit ?? 10,
      'page[offset]': options?.skip ?? 0
    }

    if (options?.search) {
      query['filter[title][operator]'] = 'CONTAINS'
      query['filter[title][value]'] = options.search
    }

    const response = await this.fetch('/jsonapi/node/page', { query })
    return { data: response.data, total: response.meta?.count ?? response.data.length }
  }
};
