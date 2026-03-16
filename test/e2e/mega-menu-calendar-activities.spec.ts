import { test, expect } from '@playwright/test'

type Page = import('@playwright/test').Page
type Locator = import('@playwright/test').Locator

// Helper: open the mega menu and return the calendar activities section
async function openCalendarMenu (page: Page): Promise<Locator> {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const processesMenu = page.locator('.mega-menu-item.dropdown .dropdown-toggle', {
    hasText: /processes/i
  })
  await processesMenu.waitFor({ state: 'visible', timeout: 10_000 })
  await processesMenu.click()

  const dropdown = processesMenu.locator('..').locator('.dropdown-menu')
  await dropdown.waitFor({ state: 'visible', timeout: 10_000 })

  return dropdown.locator('.level-2-item', {
    hasText: /calendar of activities/i
  })
}

// Helper: click the first activity link and wait for the calendar iframe
async function clickFirstActivityAndWaitForIframe (page: Page): Promise<{ expectedId: string, iframe: Locator }> {
  const calendarSection = await openCalendarMenu(page)
  const activityLinks = calendarSection.locator('.level-3-items .nav-link')
  const count = await activityLinks.count()

  if (count === 0) {
    test.skip(true, 'No calendar activities displayed in mega menu')
    return { expectedId: '', iframe: page.locator('iframe.calendar-iframe') }
  }

  const href = await activityLinks.first().getAttribute('href') ?? ''
  const autoExpandMatch = href.match(/autoExpand=([^&]+)/)
  expect(autoExpandMatch, 'First activity link should contain autoExpand param').not.toBeNull()
  const expectedId = autoExpandMatch?.[1] ?? ''

  await activityLinks.first().click()
  await page.waitForURL('**/calendar-of-activities-and-actions', { timeout: 10_000 })

  const iframe = page.locator('iframe.calendar-iframe')
  await iframe.waitFor({ state: 'visible', timeout: 10_000 })

  return { expectedId, iframe }
}

test.describe('mega menu calendar activities', () => {
  test('calendar activities in mega menu never show dates older than 2 days', async ({ page }) => {
    const calendarSection = await openCalendarMenu(page)
    await expect(calendarSection).toBeVisible()

    const activityLinks = calendarSection.locator('.level-3-items .nav-link')
    const displayedCount = await activityLinks.count()

    // The cutoff: 2 days before today at midnight
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    twoDaysAgo.setHours(0, 0, 0, 0)

    for (let i = 0; i < displayedCount; i++) {
      const linkText = await activityLinks.nth(i).innerText()
      const dateLine = linkText.split('\n')[0].trim()
      const parsedDate = new Date(dateLine)

      expect(
        parsedDate.getTime(),
        `Activity "${dateLine}" is older than 2 days — should have been filtered out`
      ).toBeGreaterThanOrEqual(twoDaysAgo.getTime())
    }
  })

  test('clicking a calendar activity link navigates to the calendar page with autoExpand in the iframe src', async ({ page }) => {
    const { expectedId, iframe } = await clickFirstActivityAndWaitForIframe(page)

    // autoExpand must be stripped from the browser URL
    expect(page.url()).not.toContain('autoExpand')

    const iframeSrc = await iframe.getAttribute('src')
    expect(iframeSrc, 'iframe src should contain autoExpand param').toContain(`autoExpand=${expectedId}`)
  })

  test('clicking a calendar activity link and waiting for iframe load preserves the autoExpand src', async ({ page }) => {
    const { expectedId, iframe } = await clickFirstActivityAndWaitForIframe(page)

    // Wait for the iframe content to load
    const iframeElement = await iframe.elementHandle()
    const contentFrame = await iframeElement?.contentFrame().catch(() => null)
    // cross-origin iframe — fall back to a timed wait
    if (contentFrame != null) await contentFrame.waitForLoadState('load', { timeout: 5_000 }).catch(() => {})
    else await page.waitForTimeout(3_000)

    // src must still carry the autoExpand param after the iframe finishes loading
    const iframeSrc = await iframe.getAttribute('src')
    expect(iframeSrc, 'iframe src should still contain autoExpand after load').toContain(`autoExpand=${expectedId}`)
  })

  test('calendar activities API returns valid structure', async ({ request }) => {
    const response = await request.get('/api/calendar-activities?limit=4&sort=startDateCOA_dt%20asc')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('rows')
    expect(body).toHaveProperty('total')
    expect(Array.isArray(body.rows)).toBe(true)
  })
})
