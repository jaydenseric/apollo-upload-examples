import { Component } from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApolloClient from './init-apollo-client'
import getDisplayName from './get-display-name'

export default ComposedComponent => {
  return class WithData extends Component {
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

      if (!process.browser) {
        const apolloClient = initApolloClient()

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
        }

        // Forget Head items found during the getDataFromTree render to prevent
        // duplicates in the real render.
        Head.rewind()

        // Set Apollo Client initial state so the client can adopt data fetched
        // on the server.
        initialProps.initialState = {
          apollo: apolloClient.getInitialState()
        }
      }

      return initialProps
    }

    constructor(props) {
      super(props)
      this.apolloClient = initApolloClient(this.props.initialState)
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props.composedComponentProps} />
        </ApolloProvider>
      )
    }
  }
}
