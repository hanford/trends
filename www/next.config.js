const withOffline = moduleExists("next-offline") ? require("next-offline") : {};
const withTypescript = moduleExists("@zeit/next-typescript")
  ? require("@zeit/next-typescript")
  : {};

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  publicRuntimeConfig: {
    googleAnalytics: isDev ? "" : "UA-45226320-5",
    isDev
  },
  dontAutoRegisterSW: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  webpack: config => {
    // .mjs before .js for apollo and graphql (fixing failing now.sh deploy)
    config.resolve.extensions = [
      ".wasm",
      ".mjs",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json"
    ];
    return config;
  }
};

module.exports =
  moduleExists("next-offline") && moduleExists("@zeit/next-typescript")
    ? withOffline(withTypescript(nextConfig))
    : nextConfig;

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}
