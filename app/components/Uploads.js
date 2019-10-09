import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Cell, Head, Table } from './Table'

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`

export const Uploads = () => {
  const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY)

  return (
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
}
