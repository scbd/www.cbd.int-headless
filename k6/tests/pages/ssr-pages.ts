import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { ssrGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import {
  PAGE_ALIASES,
  ARTICLE_ALIASES,
  NOTIFICATION_CODES,
  SEARCH_TERMS
} from '../../const'

export function testHomePage (): void {
  ssrGet(`${BASE_URL}/`, { endpoint: 'home', layer: 'ssr' })
}

export function testDynamicPage (): void {
  const alias = randomItem(PAGE_ALIASES)
  ssrGet(`${BASE_URL}${alias}`, { endpoint: 'dynamic_page', layer: 'ssr' })
}

export function testArticlePage (): void {
  const alias = randomItem(ARTICLE_ALIASES)
  ssrGet(`${BASE_URL}/article${alias.replace('/news', '')}`, { endpoint: 'article_page', layer: 'ssr' })
}

export function testMeetingsPage (): void {
  ssrGet(`${BASE_URL}/meetings`, { endpoint: 'meetings_page', layer: 'ssr' })
}

export function testArticlesListPage (): void {
  ssrGet(`${BASE_URL}/news/articles`, { endpoint: 'articles_list_page', layer: 'ssr' })
}

export function testPressReleasesPage (): void {
  ssrGet(`${BASE_URL}/news/press-release`, { endpoint: 'press_releases_page', layer: 'ssr' })
}

export function testNotificationsPage (): void {
  ssrGet(`${BASE_URL}/notifications`, { endpoint: 'notifications_page', layer: 'ssr' })
}

export function testNotificationDetailPage (): void {
  const code = randomItem(NOTIFICATION_CODES)
  ssrGet(`${BASE_URL}/notifications/${encodeURIComponent(code)}`, { endpoint: 'notification_detail_page', layer: 'ssr' })
}

export function testSearchPage (): void {
  const term = randomItem(SEARCH_TERMS)
  ssrGet(`${BASE_URL}/search?q=${encodeURIComponent(term)}`, { endpoint: 'search_page', layer: 'ssr' })
}

export function testStatementsPage (): void {
  ssrGet(`${BASE_URL}/statements`, { endpoint: 'statements_page', layer: 'ssr' })
}

export function testAllSSRPages (): void {
  group('ssr pages', () => {
    testHomePage()
    testDynamicPage()
    testMeetingsPage()
    testArticlesListPage()
    testPressReleasesPage()
    testNotificationsPage()
    testSearchPage()
    testStatementsPage()
  })
}
