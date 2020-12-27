const withOffline = require("next-offline");

const nextConfig = {
  target: "serverless",
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    exclude: [/\.(?:js|json)$/],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
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
  }
};

module.exports = withOffline(nextConfig);
