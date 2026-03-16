import { describe, it, expect, vi, beforeEach } from 'vitest'
import { computed, ref } from 'vue'

import useCalendarActivitiesListApi from '~~/app/composables/api/use-calendar-activities'

const mockUseFetch = vi.fn()
vi.stubGlobal('computed', computed)
vi.stubGlobal('useFetch', mockUseFetch)

describe('useCalendarActivitiesListApi', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns calendarActivities and error refs', async () => {
    mockUseFetch.mockResolvedValueOnce({
      data: ref({ total: 0, rows: [] }),
      error: ref(undefined)
    })
    const result = await useCalendarActivitiesListApi(ref({ limit: 10 }))
    expect(result).toHaveProperty('calendarActivities')
    expect(result).toHaveProperty('error')
  })

  it('normalizes ISO date strings to Date objects', async () => {
    mockUseFetch.mockResolvedValueOnce({
      data: ref({
        total: 1,
        rows: [{
          id: '1',
          title: { en: 'Test' },
          createdOn: '2026-01-01T00:00:00.000Z',
          updatedOn: '2026-02-01T00:00:00.000Z'
        }]
      }),
      error: ref(undefined)
    })
    const { calendarActivities } = await useCalendarActivitiesListApi(ref({ limit: 10 }))
    expect(calendarActivities.value.rows[0].createdOn).toBeInstanceOf(Date)
    expect(calendarActivities.value.rows[0].updatedOn).toBeInstanceOf(Date)
  })
})
