const nextPlugins = require('./lib/next-plugins')
const bundleAnalyzerPlugin = require('./lib/next-plugin-bundle-analyzer')
const graphqlPlugin = require('next-plugin-graphql')
const cssPlugin = require('@zeit/next-css')
const typescriptPlugin = require('@zeit/next-typescript')
const hashicorpPlugin = require('./lib/next-plugin-hashicorp')
const DatoClient = require('./lib/dato-client')
const gql = require('graphql-tag')

module.exports = nextPlugins(
  // I think that probably the hashicorp plugin should include all of these
  // other plugins, so that we are standard across all projects, and only
  // plugins that are unique to a specific site should be here. We can make
  // that change in this PR or in a future one, just getting started here : )
  [
    hashicorpPlugin(),
    bundleAnalyzerPlugin,
    cssPlugin,
    graphqlPlugin,
    typescriptPlugin
  ],
  {
    async exportPathMap() {
      // This will be a common routing pattern, and I think it would be
      // beneficial to add some sort of "routes generated from dato collection"
      // helper to make this cleaner
      const blogPostQuery = await loadBlogPosts(100)
      return blogPostQuery.allBlogPosts.reduce(
        (acc, post) => {
          acc[`/blog/${post.slug}`] = {
            page: '/blog_post',
            query: post.id
          }
          return acc
        },
        { '/': { page: '/' } }
      )
    }
  }
)

//
// Data loading from Dato
//

const datoClient = new DatoClient()

function loadBlogPosts(number) {
  return datoClient.load(gql`
    query BlogPosts {
      allBlogPosts(first: ${number}) {
        id
        slug
      }
    }
  `)
}
