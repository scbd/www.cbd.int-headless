import { describe, it, expect } from 'vitest'
import {
  CALENDAR_ACTIVITIES,
  MEETINGS,
  NOTIFICATIONS,
  MENUS
} from '~~/constants/api-paths'

describe('api-paths constants', () => {
  it('exports CALENDAR_ACTIVITIES path', () => {
    expect(CALENDAR_ACTIVITIES).toBe('/api/calendar-activities')
  })

  it('does not collide with existing paths', () => {
    const paths = [CALENDAR_ACTIVITIES, MEETINGS, NOTIFICATIONS, MENUS]
    const unique = new Set(paths)
    expect(unique.size).toBe(paths.length)
  })
})
