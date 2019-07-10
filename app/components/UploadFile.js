import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'

const UploadFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) =>
    validity.valid &&
    mutate({
      variables: { file },
      update(
        proxy,
        {
          data: { singleUpload }
        }
      ) {
        const data = proxy.readQuery({ query: uploadsQuery })
        proxy.writeQuery({
          query: uploadsQuery,
          data: {
            ...data,
            uploads: [...data.uploads, singleUpload]
          }
        })
      }
    })

  return <input type="file" required onChange={handleChange} />
}

export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`)(UploadFile)
