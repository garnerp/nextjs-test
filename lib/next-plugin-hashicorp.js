const path = require('path')

// TODO: Write a little readme for this plugin
module.exports = function hashicorpPlugin(pluginOptions = {}) {
  return function hashicorpPluginInternal(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
      webpack(config, options) {
        config.module.rules.push({
          test: /\.mdx$/,
          use: [
            options.defaultLoaders.babel,
            '@mdx-js/loader',
            // This will resolve from this current file's location, so we should
            // be able to always bundle these together and resolve accurately.
            path.join(__dirname, 'mdx-layout-loader')
          ]
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      }
    })
  }
}
