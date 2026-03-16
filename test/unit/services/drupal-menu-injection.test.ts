import { describe, it, expect } from 'vitest'
import {
  CALENDAR_BRANCH_ID,
  CALENDAR_MENU_ITEM,
  shouldInjectCalendarItem,
  injectCalendarItemIfAbsent
} from '~~/constants/calendar-menu'
import type { Menu } from '~~/types/menu'

describe('calendar menu injection guard', () => {
  it('injects for cbd-header-processes-and-meeting without branch', () => {
    expect(shouldInjectCalendarItem('cbd-header-processes-and-meeting', undefined)).toBe(true)
  })

  it('does not inject for other menu codes', () => {
    expect(shouldInjectCalendarItem('cbd-header', undefined)).toBe(false)
    expect(shouldInjectCalendarItem('main-menu', undefined)).toBe(false)
  })

  it('does not inject when branch is specified', () => {
    expect(shouldInjectCalendarItem('cbd-header-processes-and-meeting', 'some-branch')).toBe(false)
  })
})

describe('calendar menu injection dedup', () => {
  it('appends item when not present', () => {
    const menus: Menu[] = [
      { branchId: 'existing-item', parentId: null, title: 'Meetings', url: '/meetings', position: 0, childrenCount: 0 }
    ]

    injectCalendarItemIfAbsent(menus)
    expect(menus).toHaveLength(2)
    expect(menus[1]?.branchId).toBe(CALENDAR_BRANCH_ID)
    expect(menus[1]?.component).toBe('calendar-activities')
  })

  it('does not duplicate when already present', () => {
    const menus: Menu[] = [
      { branchId: CALENDAR_BRANCH_ID, parentId: null, title: 'Calendar', url: '/cal', position: -47, childrenCount: 0 }
    ]

    injectCalendarItemIfAbsent(menus)
    expect(menus).toHaveLength(1)
  })

  it('sets correct URL and component on injected item', () => {
    const menus: Menu[] = []
    injectCalendarItemIfAbsent(menus)

    expect(menus[0]?.url).toBe('/calendar-of-activities-and-actions')
    expect(menus[0]?.component).toBe('calendar-activities')
    expect(menus[0]?.position).toBe(-47)
  })

  it('injected item is a copy of CALENDAR_MENU_ITEM', () => {
    const menus: Menu[] = []
    injectCalendarItemIfAbsent(menus)

    expect(menus[0]).toEqual(CALENDAR_MENU_ITEM)
    expect(menus[0]).not.toBe(CALENDAR_MENU_ITEM) // must be a copy, not the same reference
  })
})
