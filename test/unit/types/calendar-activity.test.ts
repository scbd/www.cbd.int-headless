import { describe, it, expect } from 'vitest'
import type { CalendarActivity } from '~~/types/calendar-activity'

describe('CalendarActivity type', () => {
  it('accepts a fully populated CalendarActivity', () => {
    const activity: CalendarActivity = {
      id: 'act-001',
      title: { en: 'Peer Review Workshop' },
      url: 'https://cbd.int/calendar/act-001',
      actionRequiredByParties: true,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-04-05'),
      createdOn: new Date('2026-01-10'),
      updatedOn: new Date('2026-02-15')
    }

    expect(activity.id).toBe('act-001')
    expect(activity.title).toEqual({ en: 'Peer Review Workshop' })
    expect(activity.url).toBe('https://cbd.int/calendar/act-001')
    expect(activity.startDate).toBeInstanceOf(Date)
    expect(activity.endDate).toBeInstanceOf(Date)
    expect(activity.createdOn).toBeInstanceOf(Date)
    expect(activity.updatedOn).toBeInstanceOf(Date)
  })

  it('accepts nullable fields as null', () => {
    const activity: CalendarActivity = {
      id: 'act-002',
      title: { en: 'TBD Activity' },
      url: null,
      actionRequiredByParties: false,
      startDate: null,
      endDate: null,
      createdOn: new Date('2026-01-01'),
      updatedOn: new Date('2026-01-01')
    }

    expect(activity.url).toBeNull()
    expect(activity.startDate).toBeNull()
    expect(activity.endDate).toBeNull()
  })

  it('supports multilingual title via LString', () => {
    const activity: CalendarActivity = {
      id: 'act-003',
      title: { en: 'Workshop', fr: 'Atelier', es: 'Taller' },
      url: null,
      actionRequiredByParties: false,
      startDate: null,
      endDate: null,
      createdOn: new Date('2026-01-01'),
      updatedOn: new Date('2026-01-01')
    }

    expect(activity.title).toHaveProperty('en', 'Workshop')
    expect(activity.title).toHaveProperty('fr', 'Atelier')
    expect(activity.title).toHaveProperty('es', 'Taller')
  })
})
