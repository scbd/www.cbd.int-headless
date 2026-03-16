import { defineConfig, devices } from '@playwright/test'

const isCI = process.env.CI != null && process.env.CI !== ''

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: isCI ? 'yarn preview' : 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    timeout: isCI ? 30_000 : 120_000,
    stdout: 'pipe',
    stderr: 'pipe'
  }
})
