const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Import the existing config
const nextConfig = require('./next.config.js')

// Export the combined configuration
module.exports = withBundleAnalyzer(nextConfig)
