import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Add explicit base path
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react"
    }),
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.md'],
  build: {
    // Generate static HTML for each route
    ssrManifest: true,
  }
});