const getClient = require('./apolloClient')
const { Document } = require('graphql')

// A very light wrapper over Dato graphql queries. I'd like for this to be
// expanded in time.
// TODO: I would like for the apollo client to be able to accept different
// credentials so that this getClient function can be initialized
// separately for different services, but that's a little out of depth at
// the moment.
module.exports = class DatoClient {
  private client = getClient()

  public load(query: Document) {
    return this.client
      .query({ query })
      .catch((err: Error) => {
        console.warn(`Error loading from Dato`, err)
      })
      .then((resp: any) => resp.data)
  }
}
