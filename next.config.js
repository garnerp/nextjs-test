const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const getClient = require('./lib/apolloClient')
const withGraphql = require('next-plugin-graphql')
const gql = require('graphql-tag')
const withHashicorp = require('@hashicorp/next-hashicorp')

const config = {
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
  }
}

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

module.exports = withTypescript(
  withGraphql(withCSS(withBundleAnalyzer(withHashicorp(config))))
)
