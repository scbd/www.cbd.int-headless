import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'

export function testGbfTargets (): void {
  apiGet(`${BASE_URL}/api/gbf-targets`, { endpoint: 'gbf_targets' })
}

export function testAllGbfTargets (): void {
  group('api/gbf-targets', () => {
    testGbfTargets()
  })
}
