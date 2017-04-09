import {graphql, gql} from 'react-apollo'

const UploadList = ({data: {allUploads}}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        {allUploads.map(({name, type, size, path}) => (
          <tr key={path}>
            <td>{name}</td>
            <td>{type}</td>
            <td>{size}</td>
            <td>{path}</td>
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        table {
          text-align: left;
          border-spacing: 0.75em;
        }
        td {
          vertical-align: top;
        }
      `}</style>
    </table>
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
