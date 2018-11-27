const withOffline = require('next-offline')

const isDev = process.env.NODE_ENV !== 'production'

console.log(process.env.NOW_URL)

module.exports = withOffline({
  publicRuntimeConfig: {
    api: isDev ? 'http://localhost:2999' : typeof window !== 'undefined' ? '' : process.env.NOW_URL,
    googleAnalytics: isDev ? '' : 'UA-45226320-5',
    isDev,
  },
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
})
