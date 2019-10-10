import 'cross-fetch/polyfill'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { stylesGlobal, stylesGlobalTheme } from 'device-agnostic-ui'
import App from 'next/app'
import Head from 'next/head'

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI })
  })

export default class CustomApp extends App {
  static async getInitialProps({ ctx, router, Component }) {
    const props = {}

    if (Component.getInitialProps)
      props.pageProps = await Component.getInitialProps(ctx)

    if (ctx.req) {
      const apolloClient = createApolloClient()
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        await getDataFromTree(
          <CustomApp
            {...props}
            apolloClient={apolloClient}
            router={router}
            Component={Component}
          />
        )
      } catch (error) {
        // Prevent crash from GraphQL errors.
        console.error(error)
      }
      Head.rewind()
      props.apolloCache = apolloClient.cache.extract()
    }

    return props
  }

  apolloClient =
    this.props.apolloClient || createApolloClient(this.props.apolloCache)

  render() {
    const { Component, pageProps = {} } = this.props
    return (
      <ApolloProvider client={this.apolloClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />
          <meta name="theme-color" content="white" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <Component {...pageProps} />
        <style jsx global>
          {stylesGlobalTheme}
        </style>
        <style jsx global>
          {stylesGlobal}
        </style>
      </ApolloProvider>
    )
  }
}
