import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const QUERY = gql`
  query uploads {
    uploads {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`

class UploadListQuery extends React.PureComponent {
  render() {
    if (this.props.data.error) {
      console.log(this.props.data.error)
      return null
    }
    return this.props.children(this.props.data)
  }
}

export default graphql(QUERY)(UploadListQuery)
