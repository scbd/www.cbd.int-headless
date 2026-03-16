import type { Menu } from '~~/types/menu'

export const CALENDAR_BRANCH_ID = 'temp-calendar-of-activities'

export const CALENDAR_MENU_ITEM: Menu = {
  branchId: CALENDAR_BRANCH_ID,
  parentId: null,
  title: 'Calendar of Activities',
  url: '/calendar-of-activities-and-actions',
  position: -47,
  component: 'calendar-activities',
  childrenCount: 0
}

export function shouldInjectCalendarItem (code: string, branch: string | undefined): boolean {
  return code === 'cbd-header-processes-and-meeting' && branch == null
}

export function injectCalendarItemIfAbsent (menus: Menu[]): void {
  const alreadyPresent = menus.some(item => item.branchId === CALENDAR_BRANCH_ID)
  if (!alreadyPresent) {
    menus.push({ ...CALENDAR_MENU_ITEM })
  }
}
