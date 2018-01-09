import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

/**
 * Creates a new Apollo Client instance.
 * @param {Object} [initialState] - Redux initial state.
 * @returns {Object} Apollo Client instance.
 */
export default (initialState = {}) =>
  new ApolloClient({
    cache: new InMemoryCache().restore(initialState),
    link: createUploadLink({
      uri: 'http://localhost:3001/graphql',
    }),
  })
