/// <reference  types="vitest" />
/// <reference  types="vite/client" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dynamicImport from 'vite-plugin-dynamic-import'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setup.ts'],
  },
  plugins: [react(), dynamicImport(), tsconfigPaths()],
})
