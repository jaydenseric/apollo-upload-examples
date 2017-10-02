import { graphql } from 'react-apollo'
import { Table, Head, Cell } from './table'
import uploadsQuery from '../queries/uploads'

const UploadList = ({ data: { uploads = [] } }) => (
  <Table
    thead={
      <tr>
        <Head>Name</Head>
        <Head>Type</Head>
        <Head>Size</Head>
        <Head>Path</Head>
      </tr>
    }
    tbody={uploads.map(({ id, name, type, size, path }) => (
      <tr key={id}>
        <Cell>{name}</Cell>
        <Cell>{type}</Cell>
        <Cell>{size}</Cell>
        <Cell>{path}</Cell>
      </tr>
    ))}
  />
)

export default graphql(uploadsQuery)(UploadList)
