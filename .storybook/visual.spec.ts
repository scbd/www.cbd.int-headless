import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

// The fixtures were captured on this date, and components split upcoming/past meetings by "now"
const FIXTURE_DATE = new Date('2026-11-13T12:00:00Z')

interface IndexEntry { id: string, type: 'story' | 'docs' }
const index = JSON.parse(readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8')) as { entries: Record<string, IndexEntry> }
const stories = Object.values(index.entries).filter(entry => entry.type === 'story')

for (const { id } of stories) {
  test(id, async ({ page }) => {
    await page.clock.setFixedTime(FIXTURE_DATE)
    await page.goto(`/iframe.html?id=${id}&viewMode=story`)
    await page.waitForFunction(() => document.body.classList.contains('sb-show-main'))
    await page.evaluate(async () => await document.fonts.ready)
    await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true })
  })
}
