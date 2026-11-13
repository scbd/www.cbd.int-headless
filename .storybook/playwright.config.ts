import { defineConfig } from '@playwright/test'

// Visual regression: every story of the static build (storybook-static/) against its Linux baseline.
// Run through `yarn test:visual` (Docker): fonts render differently per OS, so baselines only come from Linux.
export default defineConfig({
  testMatch: 'visual.spec.ts',
  outputDir: 'test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{platform}{ext}',
  fullyParallel: true,
  forbidOnly: process.env.CI !== undefined,
  reporter: process.env.CI !== undefined ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:6007',
    viewport: { width: 1280, height: 800 }
  },
  expect: {
    toHaveScreenshot: { animations: 'disabled', caret: 'hide' }
  },
  webServer: {
    command: 'yarn -s preview-storybook --strictPort',
    url: 'http://127.0.0.1:6007/iframe.html',
    reuseExistingServer: process.env.CI === undefined
  }
})
