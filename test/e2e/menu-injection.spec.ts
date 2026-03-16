import { test, expect } from '@playwright/test'

test.describe('menu injection', () => {
  test('cbd-header-processes-and-meeting includes calendar-activities item', async ({ request }) => {
    const response = await request.get('/api/menus/cbd-header-processes-and-meeting')
    expect(response.status()).toBe(200)

    const menus = await response.json()
    const calendarItem = menus.find(
      (item: any) => item.branchId === 'temp-calendar-of-activities'
    )

    expect(calendarItem).toBeDefined()
    expect(calendarItem.component).toBe('calendar-activities')
    expect(calendarItem.url).toBe('/calendar-of-activities-and-actions')
  })

  test('other menus are not affected by injection', async ({ request }) => {
    const response = await request.get('/api/menus/cbd-header')
    expect(response.status()).toBe(200)

    const menus = await response.json()
    const calendarItem = menus.find(
      (item: any) => item.branchId === 'temp-calendar-of-activities'
    )

    expect(calendarItem).toBeUndefined()
  })
})
