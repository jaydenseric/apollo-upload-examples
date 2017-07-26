import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'

const UploadList = ({ data: { uploads = [] } }) => {
  return (
    <div>
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
          {uploads.map(({ id, name, type, size, path }) =>
            <tr key={id}>
              <td>
                {name}
              </td>
              <td>
                {type}
              </td>
              <td>
                {size}
              </td>
              <td>
                {path}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style jsx>{`
        div {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }
        table {
          border-spacing: 0;
          padding: 1em 0;
          text-align: left;
          font-size: 90%;
        }
        th,
        td {
          padding: 0.3em 0.5em;
        }
        td {
          vertical-align: top;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}

export default graphql(uploadsQuery)(UploadList)
