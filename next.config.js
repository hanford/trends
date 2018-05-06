const withOffline = require('next-offline')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = withOffline({
  publicRuntimeConfig: {
    api: isDev ? 'http://localhost:3000' : typeof window !== 'undefined' ? '' : process.env.NOW_URL
  }
})
