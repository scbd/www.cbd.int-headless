import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { IMAGE_FIXTURES } from '../../fixtures/index.ts'

export function testImageByCodeAndCategory (): void {
  const fixture = randomItem(IMAGE_FIXTURES)
  apiGet(
    `${BASE_URL}/api/images/${fixture.category}/${encodeURIComponent(fixture.code)}`,
    { endpoint: 'images' }
  )
}

export function testAllImages (): void {
  group('api/images', () => {
    testImageByCodeAndCategory()
  })
}
