import { describe, it, expect } from 'vitest'
import type { Menu } from '~~/types/menu'

/**
 * Tests the injection guard logic used in services/drupal.ts getMenu().
 * Since getMenu() depends on Drupal API + cache, we extract and test
 * the injection condition and dedup guard as pure logic.
 */

const CALENDAR_BRANCH_ID = 'temp-calendar-of-activities'
const CALENDAR_MENU_ITEM: Menu = {
  branchId: CALENDAR_BRANCH_ID,
  parentId: null,
  title: 'Calendar of Activities',
  url: '/calendar-of-activities-and-actions',
  position: -47,
  component: 'calendar-activities',
  childrenCount: 0
}

function shouldInject (code: string, branch: string | undefined): boolean {
  return code === 'cbd-header-processes-and-meeting' && branch == null
}

function injectIfAbsent (menus: Menu[]): Menu[] {
  const alreadyPresent = menus.some(item => item.branchId === CALENDAR_BRANCH_ID)
  if (!alreadyPresent) {
    menus.push(CALENDAR_MENU_ITEM)
  }
  return menus
}

describe('calendar menu injection guard', () => {
  it('injects for cbd-header-processes-and-meeting without branch', () => {
    expect(shouldInject('cbd-header-processes-and-meeting', undefined)).toBe(true)
  })

  it('does not inject for other menu codes', () => {
    expect(shouldInject('cbd-header', undefined)).toBe(false)
    expect(shouldInject('main-menu', undefined)).toBe(false)
  })

  it('does not inject when branch is specified', () => {
    expect(shouldInject('cbd-header-processes-and-meeting', 'some-branch')).toBe(false)
  })
})

describe('calendar menu injection dedup', () => {
  it('appends item when not present', () => {
    const menus: Menu[] = [
      { branchId: 'existing-item', parentId: null, title: 'Meetings', url: '/meetings', position: 0, childrenCount: 0 }
    ]

    const result = injectIfAbsent(menus)
    expect(result).toHaveLength(2)
    expect(result[1]?.branchId).toBe(CALENDAR_BRANCH_ID)
    expect(result[1]?.component).toBe('calendar-activities')
  })

  it('does not duplicate when already present', () => {
    const menus: Menu[] = [
      { branchId: CALENDAR_BRANCH_ID, parentId: null, title: 'Calendar', url: '/cal', position: -47, childrenCount: 0 }
    ]

    const result = injectIfAbsent(menus)
    expect(result).toHaveLength(1)
  })

  it('sets correct URL and component on injected item', () => {
    const menus: Menu[] = []
    const result = injectIfAbsent(menus)

    expect(result[0]?.url).toBe('/calendar-of-activities-and-actions')
    expect(result[0]?.component).toBe('calendar-activities')
    expect(result[0]?.position).toBe(-47)
  })
})
