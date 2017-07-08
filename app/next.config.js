/* eslint-disable import/unambiguous */

module.exports = {
  webpack: config => {
    // See https://github.com/webpack/webpack/issues/5135
    config.module.strictThisContextOnImports = true
    return config
  }
}
