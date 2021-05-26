import { gql, useQuery } from '@apollo/client';
import Scroll from 'device-agnostic-ui/public/components/Scroll.js';
import Table from 'device-agnostic-ui/public/components/Table.js';

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`;

export function Uploads() {
  const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY);

  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>MIME type</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map(({ id, filename, mimetype, path }) => (
            <tr key={id}>
              <td>{filename}</td>
              <td>{mimetype}</td>
              <td>{path}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
}
