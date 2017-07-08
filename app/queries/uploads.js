import { gql } from 'react-apollo'

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
