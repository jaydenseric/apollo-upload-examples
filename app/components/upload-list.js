import {graphql, gql} from 'react-apollo'

const UploadList = ({data: {allUploads, loading}}) => {
  return (
    <ul>
      {allUploads.map((file) => {
        return <li key={file.id}>{file.name}</li>
      })}
    </ul>
  )
}

export default graphql(gql`
  query allUploads {
    allUploads {
      id
      name
      type
      size
      path
    }
  }
`)(UploadList)
