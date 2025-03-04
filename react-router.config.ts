import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  async prerender() {
    // Add the routes you want to prerender here
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
      // Note: /design-system is intentionally not included here
      // as it should only be accessible in development mode
    ];
  },
} satisfies Config; 