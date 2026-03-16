import { test, expect } from '@playwright/test'

test.describe('calendar-activities API', () => {
  test('GET /api/calendar-activities returns valid search result', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=2')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('rows')
    expect(typeof body.total).toBe('number')
    expect(Array.isArray(body.rows)).toBe(true)
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

  test('GET /api/calendar-activities supports startDateCOA_dt fieldQueries filter', async ({ request }) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.toISOString().split('T')[0]}T00:00:00Z`
    const fieldQueries = `startDateCOA_dt:[${yesterdayStr} TO *]`
    const response = await request.get(`/api/calendar-activities?limit=4&sort=startDateCOA_dt%20asc&fieldQueries=${encodeURIComponent(fieldQueries)}`)
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('rows')
    expect(Array.isArray(body.rows)).toBe(true)

    // Every returned row must have a startDate on or after yesterday
    for (const row of body.rows) {
      expect(new Date(row.startDate).getTime()).toBeGreaterThanOrEqual(new Date(yesterdayStr).getTime())
    }
  })

  test('GET /api/calendar-activities returns results without date filter (fallback scenario)', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=4&sort=startDateCOA_dt%20desc')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('total')
    expect(body.total).toBeGreaterThan(0)
    expect(body.rows.length).toBeGreaterThan(0)
  })
})
