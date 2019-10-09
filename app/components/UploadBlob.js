import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import Field from './Field'

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`

export const UploadBlob = () => {
  const [name, setName] = React.useState('')
  const [content, setContent] = React.useState('')
  const [singleUploadMutation] = useMutation(SINGLE_UPLOAD_MUTATION)
  const apolloClient = useApolloClient()

  const onNameChange = ({ target: { value } }) => setName(value)
  const onContentChange = ({ target: { value } }) => setContent(value)
  const onSubmit = event => {
    event.preventDefault()

    const file = new Blob([content], { type: 'text/plain' })
    file.name = `${name}.txt`

    singleUploadMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore()
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Field>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={onNameChange}
        />{' '}
        .txt
      </Field>
      <Field>
        <textarea
          placeholder="Content"
          required
          value={content}
          onChange={onContentChange}
        />
      </Field>
      <button>Upload</button>
    </form>
  )
}
