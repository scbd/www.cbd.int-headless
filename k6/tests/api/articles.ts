import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'

export function testArticlesList (): void {
  apiGet(`${BASE_URL}/api/articles`, {
    endpoint: 'articles',
    params: { limit: 10, skip: 0 }
  })
}

export function testArticlesListPaginated (): void {
  apiGet(`${BASE_URL}/api/articles`, {
    endpoint: 'articles',
    params: { limit: 10, skip: 10 }
  })
}

export function testArticlesSearch (): void {
  apiGet(`${BASE_URL}/api/articles`, {
    endpoint: 'articles',
    params: { search: 'biodiversity', limit: 10, skip: 0 }
  })
}

export function testAllArticles (): void {
  group('api/articles', () => {
    testArticlesList()
    testArticlesListPaginated()
    testArticlesSearch()
  })
}
