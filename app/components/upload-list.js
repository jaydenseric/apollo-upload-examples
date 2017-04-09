import {graphql} from 'react-apollo'
import uploadsQuery from '../queries/uploads'

const UploadList = ({data: {uploads}}) => {
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
        {uploads.map(({id, name, type, size, path}) => (
          <tr key={id}>
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

export default graphql(uploadsQuery)(UploadList)
