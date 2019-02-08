const gql = require('graphql-tag')
const { withHashicorp, apolloClient } = require('@hashicorp/next-hashicorp')

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
  }
}

function loadFromDato() {
  return apolloClient()
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

console.log(withHashicorp(config))

module.exports = withHashicorp(config)
