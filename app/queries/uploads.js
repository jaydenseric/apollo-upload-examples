import gql from 'graphql-tag'

export default gql`
  query uploads {
    uploads {
      id
      name
      type
      size
      path
    }
  }
`
