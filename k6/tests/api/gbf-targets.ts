import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'

export function testGbfTargets (): void {
  apiGet(`${BASE_URL}/api/gbf-targets`, { endpoint: 'gbf_targets' })
}

export function testAllGbfTargets (): void {
  group('api/gbf-targets', () => {
    testGbfTargets()
  })
}
