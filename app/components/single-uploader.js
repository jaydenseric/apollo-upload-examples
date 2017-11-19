import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import FileInput from './file-input'
import uploadsQuery from '../queries/uploads'

const SingleUploader = ({ mutate }) => {
  const handleChange = ({ target }) =>
    target.validity.valid &&
    mutate({
      variables: { file: target.files[0] },
      update: (proxy, { data: { singleUpload } }) => {
        const data = proxy.readQuery({ query: uploadsQuery })
        data.uploads.push(singleUpload)
        proxy.writeQuery({ query: uploadsQuery, data })
      }
    })

  return <FileInput required onChange={handleChange} />
}

export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`)(SingleUploader)
