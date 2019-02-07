const path = require('path')

// TODO: Write a little readme for this plugin
module.exports = function hashicorpPlugin() {
  return function hashicorpPluginInternal(nextConfig: any = {}) {
    return Object.assign({}, nextConfig, {
      pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
      webpack(config: any, options: any) {
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
