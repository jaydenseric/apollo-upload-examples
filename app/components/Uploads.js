import { gql, useQuery } from '@apollo/client';
import Scroll from 'device-agnostic-ui/Scroll.mjs';
import Table from 'device-agnostic-ui/Table.mjs';

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
      id
      url
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
            <th>Stored file URL</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map(({ id, url }) => (
            <tr key={id}>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
}
