import { ApolloProvider } from 'react-apollo'
import App, { Container } from 'next/app'
import withApollo from '../withApollo'

class CustomApp extends App {
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

export default withApollo(CustomApp)
