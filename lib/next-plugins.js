// Next Plugins
// ------------
// A utility that makes the using next.js plugins a little smoother.
//
// Example usage, within next.config.js:
//
// ```
// module.exports = nextPlugins([
//   somePlugin(),
//   someOtherPlugin
// ], {
//   /* your normal nextjs config here */
// })
// ```
// Note that the order from how plugins are typically used with next.js should
// be reversed with this pattern. For example, if you were previously using
// plugins in the following manner:
//
// pluginOne(pluginTwo(pluginThree(config)))
//
// The order of execution would actually be the opposite of what makes
// intuitive sense - pluginThree would be the first to run, followed by two,
// then one, as functions execute from the inside out. If you needed to
// precisely preserve order, and order does matter for some next.js plugins,
// you would need to convert the above config as such for use within next
// plugins:
//
// nextPlugins([pluginThree, pluginTwo, pluginOne], config)
//
// Just worth keeping in mind as it can be a common mistake to miss this. The
// good news is that next-plugins' pattern is much easier to read and manage,
// so post conversion everything should make perfect sense -- plugins are
// executed in exactly the order they are seen in the array.

module.exports = function nextPlugins(plugins, config = {}) {
  // For the initial config, extract the webpack function so it is not clobbered
  // by plugin-added webpack configs
  let result = extractWebpackModification(config)

  // For each plugin, run it, passing in the config, and extract the webpack
  // function in the same way so each one can be preserved.
  plugins.forEach(plugin => {
    result = extractWebpackModification(plugin(result))
  })

  // Apply webpack function modifications
  // TODO: in theory the config mod should be applied last, but currently is
  // applied first
  if (webpackModifications.length) {
    result.webpack = function(config, options) {
      return webpackModifications.reduce(
        (acc, mod) => mod(acc, options),
        config
      )
    }
  }

  return result
}

// Webpack config modifications are exposed as a function, so any plugin that
// utilizes this will clobber the previous plugin's mods, since functions
// cannot be merged for obvious reasons. To solve this, we store each webpack
// config mod function, and return a function that applies each in order.
const webpackModifications = []
function extractWebpackModification(result) {
  if (result.webpack) {
    webpackModifications.push(result.webpack)
    delete result.webpack
  }
  return result
}
