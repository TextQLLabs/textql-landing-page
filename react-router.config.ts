import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // Disable SSR but keep pre-rendering
  ssr: false,
  async prerender() {
    // Pre-render all routes for SEO
    return [
      "/", 
      "/pricing", 
      "/enterprise", 
      "/workflows", 
      "/about", 
      "/agents", 
      "/ontology", 
      "/terms", 
      "/privacy", 
      "/blog"
    ];
  },
} satisfies Config; 