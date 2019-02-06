const getClient = require('./apolloClient')

// A very light wrapper over Dato graphql queries. I'd like for this to be
// expanded in time.
module.exports = class DatoClient {
  constructor(apiKey) {
    // TODO: I would like for the apollo client to be able to accept different
    // credentials so that this getClient function can be initialized
    // separately for different services, but that's a little out of depth at
    // the moment.
    this.client = getClient()
  }

  load(query) {
    return this.client
      .query({ query })
      .catch(err => {
        console.warn(`Error loading from Dato`, err)
      })
      .then(resp => resp.data)
  }
}
