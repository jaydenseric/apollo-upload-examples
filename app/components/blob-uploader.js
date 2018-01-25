import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import FileInput from './file-input'
import uploadsQuery from '../queries/uploads'

const BlobUploader = ({ mutate }) => {
  const handleChange = ({ target }) => {
    // We just convert the actual File to a Blob for the example
    const blob = new Blob([target.files[0].slice(0, -1)], { type: target.files[0].type })
    blob.name = target.files[0].name; // Don't forget to add the name to the Blob or it will be unnamed!

    mutate({
      variables: { file: blob },
      update: (proxy, { data: { singleUpload } }) => {
        const data = proxy.readQuery({ query: uploadsQuery })
        data.uploads.push(singleUpload)
        proxy.writeQuery({ query: uploadsQuery, data })
      }
    })
  }

  return <FileInput required onChange={handleChange} title={'Blob upload'} />
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
`)(BlobUploader)
