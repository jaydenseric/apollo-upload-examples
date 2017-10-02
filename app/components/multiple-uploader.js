import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import FileInput from './file-input'
import uploadsQuery from '../queries/uploads'

const MultipleUploader = ({ mutate }) => {
  const handleChange = ({ target }) =>
    target.validity.valid &&
    mutate({
      variables: {
        files: target.files
      },
      refetchQueries: [
        {
          query: uploadsQuery
        }
      ]
    })

  return <FileInput multiple required onChange={handleChange} />
}

export default graphql(gql`
  mutation($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
      name
      type
      size
      path
    }
  }
`)(MultipleUploader)
