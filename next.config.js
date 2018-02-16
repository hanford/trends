const withOffline = require('next-offline')

module.exports = withOffline({
  webpack (config) {

    return config
  }
})
