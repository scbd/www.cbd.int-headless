import { test, expect } from '@playwright/test';

test.describe('calendar-of-activities-and-actions page', () => {
  test('page loads with 200 status', async ({ page }) => {
    const response = await page.goto('/calendar-of-activities-and-actions');
    expect(response?.status()).toBe(200);
  });

  test('page has a heading', async ({ page }) => {
    await page.goto('/calendar-of-activities-and-actions');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Calendar of Activities/i);
  });

  test('page uses home layout with header and footer', async ({ page }) => {
    await page.goto('/calendar-of-activities-and-actions');
    const main = page.locator('main.cus-main');
    await expect(main).toBeVisible();
  });

  test('page has title set', async ({ page }) => {
    await page.goto('/calendar-of-activities-and-actions');
    await expect(page).toHaveTitle(/Calendar of Activities/i);
  });
});
