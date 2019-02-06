const { ApolloClient, InMemoryCache, HttpLink } = require('apollo-boost')
const fetch = require('node-fetch')

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'https://graphql.datocms.com',
      headers: {
        Authorization: '78d2968c99a076419fbb'
      }
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

module.exports = function getClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
