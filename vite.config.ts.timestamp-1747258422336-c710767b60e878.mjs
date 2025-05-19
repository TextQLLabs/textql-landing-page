// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mdx from "file:///home/project/node_modules/@mdx-js/rollup/index.js";
var vite_config_default = defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react"
    }),
    react()
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  assetsInclude: ["**/*.md"],
  build: {
    // Generate static HTML for each route
    ssrManifest: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBtZHgoe1xuICAgICAgcHJvdmlkZXJJbXBvcnRTb3VyY2U6IFwiQG1keC1qcy9yZWFjdFwiXG4gICAgfSksXG4gICAgcmVhY3QoKVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyoubWQnXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBHZW5lcmF0ZSBzdGF0aWMgSFRNTCBmb3IgZWFjaCByb3V0ZVxuICAgIHNzck1hbmlmZXN0OiB0cnVlLFxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFHaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysc0JBQXNCO0FBQUEsSUFDeEIsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLGVBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDekIsT0FBTztBQUFBO0FBQUEsSUFFTCxhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
