import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook-vue/nuxt',
  staticDirs: ['../public'],
  viteFinal (config) {
    // The framework disables dependency discovery; CJS packages the browser imports must be pre-bundled
    config.optimizeDeps ??= {}
    config.optimizeDeps.include = [...(config.optimizeDeps.include ?? []), 'isomorphic-dompurify']
    return config
  }
}

export default config
