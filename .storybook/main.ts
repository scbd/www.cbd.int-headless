import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook-vue/nuxt',
  staticDirs: ['../public'],
  viteFinal (config, { configType }) {
    // The framework disables dependency discovery; CJS packages the browser imports must be pre-bundled
    config.optimizeDeps ??= {}
    config.optimizeDeps.include = [...(config.optimizeDeps.include ?? []), 'isomorphic-dompurify']
    // The framework (10.0.3) loads Nuxt in production mode, which strips Vue's HMR runtime:
    // saving a .vue file would throw `__VUE_HMR_RUNTIME__ is not defined` instead of hot-reloading
    if (configType === 'DEVELOPMENT') {
      config.define = { ...config.define, 'process.env.NODE_ENV': '"development"' }
    }
    return config
  }
}

export default config
