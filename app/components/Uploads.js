import { useQuery } from '@apollo/react-hooks';
import { Scroll, Table } from 'device-agnostic-ui';
import gql from 'graphql-tag';

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

export const Uploads = () => {
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
};
