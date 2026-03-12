import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '~~': resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    include: ['test/unit/**/*.{test,spec}.ts'],
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '.nuxt/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.ts',
      ],
    },
  },
});
