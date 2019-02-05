// exposes a slightly more sane pattern for extending next's config with plugins
module.exports = function nextPlugins(plugins, config) {
  let result = config
  plugins.reverse().map(plugin => {
    if (Array.isArray(plugin)) {
      result = plugin[0](result, options)
    } else if (typeof plugin === 'function') {
      result = plugin(result)
    } else {
      throw new Error(
        'Plugins can be a function, or an array containing a function and its config arguments.'
      )
    }
  })
  return result
}
