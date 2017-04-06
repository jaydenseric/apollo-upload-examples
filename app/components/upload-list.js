import {graphql, gql} from 'react-apollo'

const UploadList = ({data: {allUploads, loading}}) => {
  return (
    <ul>
      {allUploads.map((file, i) => {
        return <li key={i}>{file.name}</li>
      })}
    </ul>
  )
}

export default graphql(gql`
  query allUploads {
    allUploads {
      name
      type
      size
      path
    }
  }
`)(UploadList)
