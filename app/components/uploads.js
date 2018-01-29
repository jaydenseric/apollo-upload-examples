import { graphql } from 'react-apollo'
import { Table, Head, Cell } from './table'
import uploadsQuery from '../queries/uploads'

const Uploads = ({ data: { uploads = [] } }) => (
  <Table
    thead={
      <tr>
        <Head>Filename</Head>
        <Head>MIME type</Head>
        <Head>Encoding</Head>
        <Head>Path</Head>
      </tr>
    }
    tbody={uploads.map(({ id, filename, mimetype, encoding, path }) => (
      <tr key={id}>
        <Cell>{filename}</Cell>
        <Cell>{mimetype}</Cell>
        <Cell>{encoding}</Cell>
        <Cell>{path}</Cell>
      </tr>
    ))}
  />
)

export default graphql(uploadsQuery)(Uploads)
