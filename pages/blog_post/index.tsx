import { NextContext } from 'next'
import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import AuthorCard from '../../components/author-card'
import getBlogPostQuery from './getBlogPost.graphql'
import { BlogPost as BlogPostFields, BlogPostVariables } from './types/BlogPost'

class BlogPost extends Component<
  ChildProps<BlogPostVariables, BlogPostFields>,
  {}
> {
  public static async getInitialProps(context: NextContext) {
    const slug = context.asPath.replace(/^\/blog\//, '')
    return { slug }
  }

  public render() {
    const { loading, error, blogPost } = this.props.data

    return (
      <div>
        <p>{error ? `Error: ${error}` : ''}</p>
        <p>{loading ? 'Loading...' : ''}</p>
        <p>{JSON.stringify(blogPost)}</p>
        {blogPost && blogPost.author && <AuthorCard id={blogPost.author.id} />}
      </div>
    )
  }
}

export default graphql<BlogPostVariables, BlogPostFields>(getBlogPostQuery, {
  options: ({ slug }) => ({ variables: { slug } })
})(BlogPost)
