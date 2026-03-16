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

function makeSolrResponse (docs: object[], numFound = docs.length): { response: { docs: object[], numFound: number } } {
  return { response: { docs, numFound } }
}

describe('listCalendarActivities — field mapping', () => {
  it('maps identifier_s to id', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-abc',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-02-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.id).toBe('act-abc')
  })

  it('sets actionRequiredByParties from actionRequiredByParties_b', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-1',
      actionRequiredByParties_b: true,
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.actionRequiredByParties).toBe(true)
  })

  it('defaults actionRequiredByParties to false when field is absent', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-2',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.actionRequiredByParties).toBe(false)
  })

  it('parses startDateCOA_dt as a Date', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-3',
      startDateCOA_dt: '2026-06-15T00:00:00Z',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.startDate).toBeInstanceOf(Date)
    expect(result.rows[0]?.startDate?.getFullYear()).toBe(2026)
  })

  it('sets startDate to null when startDateCOA_dt is absent', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-4',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.startDate).toBeNull()
  })

  it('sets endDate to null when endDateCOA_dt is absent', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-5',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.endDate).toBeNull()
  })

  it('uses url_ss[0] as url when present', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-6',
      url_ss: ['https://cbd.int/calendar/act-6'],
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.url).toBe('https://cbd.int/calendar/act-6')
  })

  it('falls back to autoExpand deep-link URL when url_ss is absent', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([{
      identifier_s: 'act-7',
      createdDate_dt: '2026-01-01T00:00:00Z',
      updatedDate_dt: '2026-01-01T00:00:00Z'
    }]))

    const result = await listCalendarActivities({ limit: 1 })
    expect(result.rows[0]?.url).toBe('/calendar-of-activities-and-actions?autoExpand=act-7')
  })

  it('returns correct total from numFound', async () => {
    mockQuerySolr.mockResolvedValueOnce(makeSolrResponse([], 42))

    const result = await listCalendarActivities({ limit: 10 })
    expect(result.total).toBe(42)
  })
})
