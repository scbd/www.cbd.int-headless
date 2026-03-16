import { describe, it, expect, vi } from 'vitest'

import { listCalendarActivities } from '~~/services/calendar-activity'
import handler from '~~/server/api/calendar-activities/index.get'

vi.hoisted(() => {
  const g = globalThis as any
  g.defineEventHandler = (fn: any) => fn
  g.getQuery = () => ({})
  g.createError = (o: any) => Object.assign(new Error(o.statusMessage ?? o.message), { statusCode: o.statusCode })
})

vi.mock('~~/services/calendar-activity', () => ({ listCalendarActivities: vi.fn() }))

describe('calendar-activities handler error handling', () => {
  it('re-throws service error via apiErrorHandler', async () => {
    vi.mocked(listCalendarActivities).mockRejectedValueOnce({ statusCode: 503, message: 'Solr down' })
    await expect((handler as any)({})).rejects.toThrow('Solr down')
  })
})
