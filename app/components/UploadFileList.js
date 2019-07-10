import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'

const UploadFileList = ({ mutate }) => {
  const handleChange = ({ target: { validity, files } }) =>
    validity.valid &&
    mutate({
      variables: { files },
      update(
        proxy,
        {
          data: { multipleUpload }
        }
      ) {
        const data = proxy.readQuery({ query: uploadsQuery })
        proxy.writeQuery({
          query: uploadsQuery,
          data: {
            ...data,
            uploads: [...data.uploads, ...multipleUpload]
          }
        })
      }
    })

  return <input type="file" multiple required onChange={handleChange} />
}

export default graphql(gql`
  mutation($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
      filename
      mimetype
      path
    }
  }
`)(UploadFileList)
