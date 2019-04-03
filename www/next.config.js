const withOffline = require("next-offline");
const withTypescript = require("@zeit/next-typescript");

const nextConfig = {
  experimental: { amp: true },
  target: "serverless",
  dontAutoRegisterSw: true,
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

module.exports = withOffline(withTypescript(nextConfig));
