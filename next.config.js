const nextPlugins = require('./lib/next-plugins')
const bundleAnalyzerPlugin = require('@zeit/next-bundle-analyzer')
const cssPlugin = require('@zeit/next-css')
const typescriptPlugin = require('@zeit/next-typescript')
const path = require('path')
const getClient = require('./lib/apolloClient')
const graphqlPlugin = require('next-plugin-graphql')
const gql = require('graphql-tag')

module.exports = nextPlugins(
  [typescriptPlugin, graphqlPlugin, cssPlugin, bundleAnalyzerPlugin],
  {
    async exportPathMap() {
      const items = await loadFromDato()
      return items.reduce(
        (acc, post) => {
          acc[`/blog/${post.slug}`] = {
            page: '/blog_post',
            query: post.id
          }
          return acc
        },
        { '/': { page: '/' } }
      )
    },
    pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    // setup for markdown file loading
    webpack: config => {
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          'babel-loader',
          '@mdx-js/loader',
          path.join(__dirname, 'lib/mdx-layout-loader')
        ]
      })
      config.resolve.symlinks = false
      return config
    }
  }
)

function loadFromDato() {
  return getClient()
    .query({
      query: gql`
        query BlogPosts {
          allBlogPosts(first: 100) {
            id
            slug
          }
        }
      `
    })
    .then(resp => resp.data.allBlogPosts)
    .catch(err => {
      console.warn(`Error loading blog post routes from Dato`, err)
    })
}
