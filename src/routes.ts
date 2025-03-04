import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  // Just use a catchall route to load the current App component
  // This way we don't have to rewrite all the routes
  route("*?", "catchall.tsx"),
] satisfies RouteConfig; 