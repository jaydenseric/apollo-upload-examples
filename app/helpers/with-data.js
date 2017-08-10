import { Component } from 'react'
import { ApolloClient, getDataFromTree, ApolloProvider } from 'react-apollo'
import BatchHttpLink from 'apollo-link-batch-http'
import { createApolloFetchUpload } from 'apollo-fetch-upload'
import getDisplayName from 'react-display-name'
import Head from 'next/head'

const ssrMode = !process.browser

// To share an instance between pages on the client
let apolloClient

/**
 * Creates a new Apollo Client instance.
 * @param {Object} [initialState] - Redux initial state.
 * @returns {Object} Apollo Client instance.
 */
const createApolloClient = initialState =>
  new ApolloClient({
    initialState,
    ssrMode,
    networkInterface: new BatchHttpLink({
      fetch: createApolloFetchUpload({
        uri: process.env.API_URI
      })
    })
  })

export default ComposedComponent =>
  class WithData extends Component {
    static displayName = `WithData(${getDisplayName(ComposedComponent)})`

    /**
     * Gets the initial props for a Next.js page component.
     * Executes on the server for the initial page load. Executes on the client
     * when navigating to a different route via the Link component or using the
     * routing APIs. For either environment the initial props returned must be
     * serializable to JSON.
     * @see https://github.com/zeit/next.js/issues/978
     * @see https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle
     * @param {Object} context
     * @param {String} context.pathname - Path section of the page URL.
     * @param {Object} context.query - Query string section of the page URL parsed as an object.
     * @param {Object} context.req - HTTP request (server only).
     * @param {Object} context.res - HTTP response (server only).
     * @param {Object} context.jsonPageRes - Fetch Response (client only).
     * @param {Object} context.err - Error encountered during the rendering, if any.
     * @returns {Promise} Page component props.
     */
    static async getInitialProps(context) {
      const initialProps = {
        composedComponentProps: {
          url: {
            query: context.query,
            pathname: context.pathname
          }
        }
      }

      // If the page component has initial props, merge them in.
      if (ComposedComponent.getInitialProps) {
        Object.assign(
          initialProps.composedComponentProps,
          await ComposedComponent.getInitialProps(context)
        )
      }

      if (ssrMode) {
        const apolloClient = createApolloClient()

        try {
          // Recurse the component tree and prefetch all Apollo data queries to
          // populate the Apollo Client Redux store. This allows an instant
          // server side render.
          // See: http://dev.apollodata.com/react/server-side-rendering.html#getDataFromTree
          await getDataFromTree(
            <ApolloProvider client={apolloClient}>
              <ComposedComponent {...initialProps.composedComponentProps} />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          // eslint-disable-next-line no-console
          console.error(error)
        }

        // Forget Head items found during the getDataFromTree render to prevent
        // duplicates in the real render.
        Head.rewind()

        // Set Apollo Client initial state so the client can adopt data fetched
        // on the server.
        initialProps.initialState = { apollo: apolloClient.getInitialState() }
      }

      // Return the final page component inital props
      return initialProps
    }

    constructor(props) {
      super(props)
      if (ssrMode) {
        // For the server an Apollo Client instance exists per request
        this.apolloClient = createApolloClient(this.props.initialState)
      } else {
        // For the client an Apollo Client instance is shared between pages
        if (!apolloClient)
          apolloClient = createApolloClient(this.props.initialState)
        this.apolloClient = apolloClient
      }
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props.composedComponentProps} />
        </ApolloProvider>
      )
    }
  }
