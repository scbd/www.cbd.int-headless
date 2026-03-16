import { test, expect } from '@playwright/test'

test.describe('mega menu calendar activities', () => {
  test('calendar activities in mega menu never show past dates', async ({ page, request }) => {
    // First check what the API returns with the date filter to understand
    // whether we should expect items or an empty list
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.toISOString().split('T')[0]}T00:00:00Z`

    const apiResponse = await request.get(
      `/api/calendar-activities?limit=4&sort=startDateCOA_dt%20asc&startDate=${yesterdayStr}`
    )
    const apiBody = await apiResponse.json()
    const expectedCount = apiBody.rows.length

    // Now load the page and open the mega menu
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const processesMenu = page.locator('.mega-menu-item.dropdown .dropdown-toggle', {
      hasText: /processes/i
    })
    await processesMenu.waitFor({ state: 'visible', timeout: 10_000 })
    await processesMenu.click()

    const dropdown = processesMenu.locator('..').locator('.dropdown-menu')
    await dropdown.waitFor({ state: 'visible', timeout: 10_000 })

    // Find the calendar activities section
    const calendarSection = dropdown.locator('.level-2-item', {
      hasText: /calendar of activities/i
    })
    await expect(calendarSection).toBeVisible()

    // Get all displayed activity links
    const activityLinks = calendarSection.locator('.level-3-items .nav-link')
    const displayedCount = await activityLinks.count()

    // The displayed count must match what the filtered API returns
    expect(displayedCount, 'displayed item count should match filtered API result count').toBe(expectedCount)

    // If there are items, every date must be from yesterday forward
    for (let i = 0; i < displayedCount; i++) {
      const linkText = await activityLinks.nth(i).innerText()
      const dateLine = linkText.split('\n')[0].trim()
      const parsedDate = new Date(dateLine)

      expect(
        parsedDate.getTime(),
        `Activity "${dateLine}" should be from yesterday (${yesterdayStr}) forward`
      ).toBeGreaterThanOrEqual(yesterday.getTime())
    }

    // If there are NO items, verify the API has past-only data (confirming
    // the component correctly omitted stale entries rather than falling back)
    if (displayedCount === 0) {
      const allResponse = await request.get('/api/calendar-activities?limit=4&sort=startDateCOA_dt%20desc')
      const allBody = await allResponse.json()
      // There ARE activities in the system, but none upcoming — the menu
      // correctly shows nothing instead of stale dates
      if (allBody.rows.length > 0) {
        for (const row of allBody.rows) {
          expect(
            new Date(row.startDate).getTime(),
            `Unfiltered activity "${row.title.en}" should be in the past, confirming the menu correctly excluded it`
          ).toBeLessThan(new Date(yesterdayStr).getTime())
        }
      }
    }
  })

  test('clicking a calendar activity link navigates to the calendar page with autoExpand in the iframe src', async ({ page, request }) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.toISOString().split('T')[0]}T00:00:00Z`

    const apiResponse = await request.get(
      `/api/calendar-activities?limit=4&sort=actionRequiredByParties_b%20desc%2C%20startDateCOA_dt%20asc&startDate=${yesterdayStr}`
    )
    const apiBody = await apiResponse.json()

    if (apiBody.rows.length === 0) {
      test.skip(true, 'No upcoming calendar activities available to test')
      return
    }

    const expectedId = apiBody.rows[0].id

    // Open the page and mega menu
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const processesMenu = page.locator('.mega-menu-item.dropdown .dropdown-toggle', {
      hasText: /processes/i
    })
    await processesMenu.waitFor({ state: 'visible', timeout: 10_000 })
    await processesMenu.click()

    const dropdown = processesMenu.locator('..').locator('.dropdown-menu')
    await dropdown.waitFor({ state: 'visible', timeout: 10_000 })

    const calendarSection = dropdown.locator('.level-2-item', {
      hasText: /calendar of activities/i
    })
    const activityLinks = calendarSection.locator('.level-3-items .nav-link')
    await expect(activityLinks.first()).toBeVisible()

    // Click the first activity — its url is /calendar-of-activities-and-actions?autoExpand=<id>
    await activityLinks.first().click()

    // Should land on the calendar page
    await page.waitForURL('**/calendar-of-activities-and-actions', { timeout: 10_000 })

    // autoExpand must be stripped from the browser URL
    expect(page.url()).not.toContain('autoExpand')

    // The iframe must have autoExpand forwarded in its src
    const iframe = page.locator('iframe.calendar-iframe')
    await iframe.waitFor({ state: 'visible', timeout: 10_000 })

    const iframeSrc = await iframe.getAttribute('src')
    expect(iframeSrc, 'iframe src should contain autoExpand param').toContain(`autoExpand=${expectedId}`)
  })

  test('clicking a calendar activity link and waiting for iframe load preserves the autoExpand src', async ({ page, request }) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.toISOString().split('T')[0]}T00:00:00Z`

    const apiResponse = await request.get(
      `/api/calendar-activities?limit=4&sort=actionRequiredByParties_b%20desc%2C%20startDateCOA_dt%20asc&startDate=${yesterdayStr}`
    )
    const apiBody = await apiResponse.json()

    if (apiBody.rows.length === 0) {
      test.skip(true, 'No upcoming calendar activities available to test')
      return
    }

    const expectedId = apiBody.rows[0].id

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const processesMenu = page.locator('.mega-menu-item.dropdown .dropdown-toggle', {
      hasText: /processes/i
    })
    await processesMenu.waitFor({ state: 'visible', timeout: 10_000 })
    await processesMenu.click()

    const dropdown = processesMenu.locator('..').locator('.dropdown-menu')
    await dropdown.waitFor({ state: 'visible', timeout: 10_000 })

    const calendarSection = dropdown.locator('.level-2-item', {
      hasText: /calendar of activities/i
    })
    const activityLinks = calendarSection.locator('.level-3-items .nav-link')
    await activityLinks.first().click()

    await page.waitForURL('**/calendar-of-activities-and-actions', { timeout: 10_000 })

    const iframe = page.locator('iframe.calendar-iframe')
    await iframe.waitFor({ state: 'visible', timeout: 10_000 })

    // Wait for the iframe content to load and scroll to the selection
    const iframeElement = await iframe.elementHandle()
    const contentFrame = await iframeElement?.contentFrame().catch(() => null)
    if (contentFrame != null) {
      await contentFrame.waitForLoadState('load', { timeout: 5_000 }).catch(() => {})
    } else {
      // cross-origin iframe — fall back to a timed wait
      await page.waitForTimeout(3_000)
    }

    // src must still carry the autoExpand param after the iframe finishes loading
    const iframeSrc = await iframe.getAttribute('src')
    expect(iframeSrc, 'iframe src should still contain autoExpand after load').toContain(`autoExpand=${expectedId}`)
  })

  test('calendar activities API returns only future activities when startDate filter is applied', async ({ request }) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.toISOString().split('T')[0]}T00:00:00Z`

    const response = await request.get(
      `/api/calendar-activities?limit=4&sort=startDateCOA_dt%20asc&startDate=${yesterdayStr}`
    )
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('rows')

    // Every returned row must have a startDate >= yesterday
    for (const row of body.rows) {
      expect(new Date(row.startDate).getTime()).toBeGreaterThanOrEqual(
        new Date(yesterdayStr).getTime()
      )
    }
  })
})
