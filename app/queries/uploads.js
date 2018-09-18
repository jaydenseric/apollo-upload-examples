import gql from 'graphql-tag'

export default gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`
