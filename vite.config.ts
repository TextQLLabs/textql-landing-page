import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import mdx from '@mdx-js/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react"
    }),
    reactRouter()
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