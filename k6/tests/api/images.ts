import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { IMAGE_FIXTURES } from '../../const'

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
