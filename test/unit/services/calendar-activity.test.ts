import { describe, it, expect, vi, beforeEach } from 'vitest'

import SolrIndexApiConstructor from '~~/api/solr-index'
import { listCalendarActivities } from '~~/services/calendar-activity'

// Mock useRuntimeConfig (Nuxt auto-import used in the service)
vi.stubGlobal('useRuntimeConfig', () => ({ apiBaseUrl: 'http://mock-solr' }))

// Mock SolrIndexApi so we control what querySolr returns
vi.mock('~~/api/solr-index', () => ({
  default: vi.fn().mockImplementation(() => ({
    querySolr: vi.fn()
  }))
}))

const mockQuerySolr = vi.fn()

beforeEach(() => {
  vi.mocked(SolrIndexApiConstructor).mockImplementation(() => ({
    querySolr: mockQuerySolr
  }) as any)
})

const makeSolrResponse = (docs: object[], numFound = docs.length): { response: { docs: object[], numFound: number } } => ({ response: { docs, numFound } })

const BASE_DATE = '2026-01-01T00:00:00Z'

const makeDoc = (overrides: Record<string, unknown> = {}): Record<string, unknown> =>
  ({ identifier_s: 'act-1', createdDate_dt: BASE_DATE, updatedDate_dt: BASE_DATE, ...overrides })

async function fetchFirst (doc: Record<string, unknown>): Promise<Record<string, unknown> | undefined> {
  mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([doc]))
  return (await listCalendarActivities({ limit: 1 })).rows[0]
}

describe('listCalendarActivities — field mapping', () => {
  it('maps identifier_s to id', async () => {
    const row = await fetchFirst(makeDoc({ identifier_s: 'act-abc', updatedDate_dt: '2026-02-01T00:00:00Z' }))
    expect(row?.id).toBe('act-abc')
  })

  it('sets actionRequiredByParties from actionRequiredByParties_b', async () => {
    const row = await fetchFirst(makeDoc({ actionRequiredByParties_b: true }))
    expect(row?.actionRequiredByParties).toBe(true)
  })

  it('defaults actionRequiredByParties to false when field is absent', async () => {
    const row = await fetchFirst(makeDoc())
    expect(row?.actionRequiredByParties).toBe(false)
  })

  it('parses startDateCOA_dt as a Date', async () => {
    const row = await fetchFirst(makeDoc({ startDateCOA_dt: '2026-06-15T00:00:00Z' }))
    expect(row?.startDate).toBeInstanceOf(Date)
    expect(row?.startDate?.getFullYear()).toBe(2026)
  })

  it('sets startDate to null when startDateCOA_dt is absent', async () => {
    const row = await fetchFirst(makeDoc())
    expect(row?.startDate).toBeNull()
  })

  it('sets endDate to null when endDateCOA_dt is absent', async () => {
    const row = await fetchFirst(makeDoc())
    expect(row?.endDate).toBeNull()
  })

  it('uses url_ss[0] as url when present', async () => {
    const row = await fetchFirst(makeDoc({ identifier_s: 'act-6', url_ss: ['https://cbd.int/calendar/act-6'] }))
    expect(row?.url).toBe('https://cbd.int/calendar/act-6')
  })

  it('falls back to autoExpand deep-link URL when url_ss is absent', async () => {
    const row = await fetchFirst(makeDoc({ identifier_s: 'act-7' }))
    expect(row?.url).toBe('/calendar-of-activities-and-actions?autoExpand=act-7')
  })

  it('returns correct total from numFound', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([], 42))
    const result = await listCalendarActivities({ limit: 10 })
    expect(result.total).toBe(42)
  })
})

describe('listCalendarActivities — Solr query building', () => {
  it('uses default sort startDateCOA_dt ASC when none specified', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([]))
    await listCalendarActivities({ limit: 1 })
    expect(mockQuerySolr).toHaveBeenCalledWith(expect.objectContaining({ sort: 'startDateCOA_dt ASC' }))
  })

  it('appends fieldQueries to the base filter', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([]))
    await listCalendarActivities({ fieldQueries: 'startDateCOA_dt:[NOW TO *]' })
    expect(mockQuerySolr).toHaveBeenCalledWith(expect.objectContaining({
      fieldQueries: expect.stringContaining('startDateCOA_dt:[NOW TO *]')
    }))
  })
})
