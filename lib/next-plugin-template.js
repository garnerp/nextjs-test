// Next.js Plugin Template
// -----------------------
//
// Next.js plugins can take one of two forms, based on official provided
// examples. The form here is for a plugin that accepts options. It is exposed
// as a function that returns a function, so it is executed as such:
//
// examplePlugin({ foo: 'bar' })(config)
//
// However, there are also nextjs plugins which accept no options, and those at
// the moment expose a different format, just returning the internal function.
// Plugins that have no options look like this:
//
// examplePlugin(config)
//
// Personally, I think this is not a great pattern -- it would be better to
// have all plugins have the capacity to take options, but if they have none,
// just call without arguments as such:
//
// examplePlugin()(config)
//
// But this is now how the nextjs authors have chosen to do things. I would
// propose that within HashiCorp, our plugins should follow the last pattern --
// always allowing for options whether or not they currently take them.
//
// I should also note that official next.js plugins typically nest two arrow
// functions, whereas I have adopted the pattern of nesting two named
// functions. While this is the more verbose approach, named functions have a
// great amount of additional utility when debugging, which is why I have moved
// toward this pattern. Imo, clarity and debugging ease trumps terse-ness just
// about always.

module.exports = function examplePlugin(pluginOptions = {}) {
  return function examplePluginInternal(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      // config you wish to add in goes here
    })
  }
}
