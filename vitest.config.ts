import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

// The Storybook CLI sets this; under Vitest nothing does, and nuxt.config.ts uses it to skip the type-checker plugin
process.env.STORYBOOK = 'true'

// Every story runs as a browser test: render, play function, then the a11y checks
// (visual regression runs separately, see .storybook/playwright.config.ts)
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
})
