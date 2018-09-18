import 'cross-fetch/polyfill'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import Head from 'next/head'
import { Component } from 'react'
import { getDataFromTree } from 'react-apollo'
import getDisplayName from 'react-display-name'

let apolloClient

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI })
  })

export default App =>
  class WithApollo extends Component {
    static displayName = `WithApollo(${getDisplayName(App)})`

    static async getInitialProps(context) {
      const props = App.getInitialProps
        ? await App.getInitialProps(context)
        : {}

      // If server environment, preload the page.
      if (context.ctx.req) {
        const apolloClient = createApolloClient()

        try {
          await getDataFromTree(
            <App
              {...props}
              Component={context.Component}
              router={context.router}
              apolloClient={apolloClient}
            />
          )
        } catch (error) {
          // Prevent crash from GraphQL errors.
          // eslint-disable-next-line no-console
          console.error(error)
        }

        props.apolloCache = apolloClient.cache.extract()

        Head.rewind()
      }

      return props
    }

    constructor(props) {
      super(props)

      // Set the ApolloClient instance used in render().
      this.apolloClient =
        typeof window !== 'undefined'
          ? // Client: Shared instance, created at first render after SSR.
            (apolloClient =
              apolloClient || createApolloClient(props.apolloCache))
          : // Server: Private instance for SSR.
            createApolloClient(props.apolloCache)
    }

    render() {
      const {
        // eslint-disable-next-line no-unused-vars
        apolloCache,
        ...appProps
      } = this.props

      return <App {...appProps} apolloClient={this.apolloClient} />
    }
  }
