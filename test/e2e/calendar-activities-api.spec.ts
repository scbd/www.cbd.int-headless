import { test, expect } from '@playwright/test'

function expectSearchResult (body: any): void {
  expect(body).toHaveProperty('total')
  expect(body).toHaveProperty('rows')
  expect(Array.isArray(body.rows)).toBe(true)
}

test.describe('calendar-activities API', () => {
  test('GET /api/calendar-activities returns valid search result', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=2')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expectSearchResult(body)
    expect(typeof body.total).toBe('number')
  })

  test('GET /api/calendar-activities rows have expected shape', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=1')
    const body = await response.json()

    if (body.rows.length > 0) {
      const row = body.rows[0]
      expect(row).toHaveProperty('id')
      expect(row).toHaveProperty('title')
      expect(row).toHaveProperty('createdOn')
      expect(row).toHaveProperty('updatedOn')
    }
  })

  test('GET /api/calendar-activities supports sort and limit params', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=4&sort=startDateCOA_dt%20asc')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expectSearchResult(body)
    expect(body.rows.length).toBeLessThanOrEqual(4)
  })

  test('GET /api/calendar-activities returns results without date filter (fallback scenario)', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=4&sort=startDateCOA_dt%20desc')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expectSearchResult(body)
    expect(body.total).toBeGreaterThan(0)
    expect(body.rows.length).toBeGreaterThan(0)
  })
})
