import 'isomorphic-fetch'
import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  getDataFromTree
} from 'react-apollo'
import {createNetworkInterface} from 'apollo-upload-client'

const ssrMode = !process.browser
let apolloClient = null

function initClient (headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode,
    networkInterface: createNetworkInterface({
      uri: process.env.API_URI
    })
  })
}

function getClient (headers, initialState = {}) {
  if (ssrMode) return initClient(headers, initialState)
  if (!apolloClient) apolloClient = initClient(headers, initialState)
  return apolloClient
}

export default Component => (
  class extends React.Component {
    static async getInitialProps (ctx) {
      const headers = ctx.req ? ctx.req.headers : {}
      const client = getClient(headers)

      const props = {
        url: {
          query: ctx.query,
          pathname: ctx.pathname
        },
        ...await (Component.getInitialProps ? Component.getInitialProps(ctx) : {})
      }

      if (ssrMode) {
        const app = (
          <ApolloProvider client={client}>
            <Component {...props} />
          </ApolloProvider>
        )
        await getDataFromTree(app)
      }

      return {
        initialState: {
          apollo: {
            data: client.getInitialState().data
          }
        },
        headers,
        ...props
      }
    }

    constructor (props) {
      super(props)
      this.client = getClient(this.props.headers, this.props.initialState)
    }

    render () {
      return (
        <ApolloProvider client={this.client}>
          <Component {...this.props} />
        </ApolloProvider>
      )
    }
  }
)
