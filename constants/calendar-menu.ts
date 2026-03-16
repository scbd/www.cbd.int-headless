import type { Menu } from '~~/types/menu'
import { CALENDAR_ACTIVITIES } from '~~/constants/url-paths'

export const CALENDAR_BRANCH_ID = 'temp-calendar-of-activities'

export const CALENDAR_MENU_ITEM: Menu = {
  branchId: CALENDAR_BRANCH_ID,
  parentId: null,
  title: 'Calendar of Activities',
  url: CALENDAR_ACTIVITIES,
  position: -47,
  component: 'calendar-activities',
  childrenCount: 0
}

export const shouldInjectCalendarItem = (code: string, branch: string | undefined): boolean =>
  code === 'cbd-header-processes-and-meeting' && branch == null

export function injectCalendarItemIfAbsent (menus: Menu[]): void {
  if (!menus.some(item => item.branchId === CALENDAR_BRANCH_ID)) menus.push({ ...CALENDAR_MENU_ITEM })
}
