/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  cacheDirectory: "./node_modules/.cache/remix",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    v2_headers: true,
  },
  ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
  postcss: true,
  serverModuleFormat: "cjs",
  tailwind: true,
  server:
  process.env.NETLIFY || process.env.NETLIFY_LOCAL
    ? "./server.ts"
    : undefined,
serverBuildPath: ".netlify/functions-internal/server.js",
};
