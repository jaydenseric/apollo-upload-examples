import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'
import { Table, Head, Cell } from './Table'

const Uploads = ({ data: { uploads = [] } }) => (
  <Table
    thead={
      <tr>
        <Head>Filename</Head>
        <Head>MIME type</Head>
        <Head>Path</Head>
      </tr>
    }
    tbody={uploads.map(({ id, filename, mimetype, path }) => (
      <tr key={id}>
        <Cell>{filename}</Cell>
        <Cell>{mimetype}</Cell>
        <Cell>{path}</Cell>
      </tr>
    ))}
  />
)

export default graphql(uploadsQuery)(Uploads)
