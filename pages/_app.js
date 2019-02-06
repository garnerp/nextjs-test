import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import delphi from '../lib/delphi'

import '../components/global-styles/base.global.css'
import '../components/global-styles/typography.global.css'
import '../components/global-styles/code-highlighting.global.css'

class NextApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default delphi(NextApp)
