import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { PAGE_ALIASES, ARTICLE_ALIASES } from '../../const'

export function testContentPage (): void {
  const alias = randomItem(PAGE_ALIASES)
  apiGet(`${BASE_URL}/api/content`, {
    endpoint: 'content',
    params: { url: alias }
  })
}

export function testContentArticle (): void {
  const alias = randomItem(ARTICLE_ALIASES)
  apiGet(`${BASE_URL}/api/content`, {
    endpoint: 'content',
    params: { url: alias }
  })
}

export function testAllContent (): void {
  group('api/content', () => {
    testContentPage()
    testContentArticle()
  })
}
