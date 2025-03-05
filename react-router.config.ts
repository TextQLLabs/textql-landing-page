import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // Static pre-rendering only, no SSR
  ssr: false,
  async prerender() {
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
      "/blog",
      "/demo"
    ];
  },
} satisfies Config; 