import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['**/e2e/**', '**/playwright/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/js/game.js'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.config.js',
        'public/**'
      ]
    },
  },
}) 