const bundleAnalyzer = require('@zeit/next-bundle-analyzer')

// This is just a small wrapper to make the configuration for the bundle
// analyzer plugin much more sane. In the readme for this plugin, it advises
// adding the plugin itself, then copy-pasting the config seen below into your
// next.js config. The best approach here would be to dig in to which of the
// options might realistically be changed by users, and convert this from an
// option-less plugin to a plugin with options, then automatically add the
// properties below to avoid copy-pasting and extra boilerplate for the user.
// Someday, I'd like to pull request this change to the original plugin, but
// for now this will do.
module.exports = function bundleAnalyzerPlugin(config: any) {
  config.analyzeServer = ['server', 'both'].includes(process.env.BUNDLE_ANALYZE)
  config.analyzeBrowser = ['browser', 'both'].includes(
    process.env.BUNDLE_ANALYZE
  )
  config.bundleAnalyzerConfig = {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }

  return bundleAnalyzer(config)
}
