import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { QUERY as UPLOADS_QUERY } from './UploadListQuery'

export const MUTATION = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`

class UploadFileMutation extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx)

    this.execute = file => this.executeMutation(file)
  }

  executeMutation(file) {
    this.props.mutate({
      variables: {
        file,
      },
      update: (proxy, { data: { singleUpload } }) => {
        const data = proxy.readQuery({ query: UPLOADS_QUERY })
        data.uploads.push(singleUpload)
        proxy.writeQuery({ query: UPLOADS_QUERY, data })
      },
    })
  }

  render() {
    return this.props.children(this.execute)
  }
}

export default graphql(MUTATION)(UploadFileMutation)
