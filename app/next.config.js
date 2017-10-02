/* eslint-disable import/unambiguous */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  webpack: config => {
    if (process.env.ANALYZE === 'true')
      config.plugins.push(new BundleAnalyzerPlugin())
    return config
  }
}
