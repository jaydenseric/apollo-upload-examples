import { gql, useApolloClient, useMutation } from '@apollo/client';
import ButtonSubmit from 'device-agnostic-ui/public/components/ButtonSubmit.js';
import Code from 'device-agnostic-ui/public/components/Code.js';
import Fieldset from 'device-agnostic-ui/public/components/Fieldset.js';
import Textbox from 'device-agnostic-ui/public/components/Textbox.js';
import React from 'react';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

export function UploadBlob() {
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  const [singleUploadMutation, { loading }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );
  const apolloClient = useApolloClient();

  const onNameChange = ({ target: { value } }) => setName(value);
  const onContentChange = ({ target: { value } }) => setContent(value);
  const onSubmit = (event) => {
    event.preventDefault();

    const file = new Blob([content], { type: 'text/plain' });
    file.name = `${name}.txt`;

    singleUploadMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Fieldset
        legend={
          <>
            File name (without <Code>.txt</Code>)
          </>
        }
      >
        <Textbox
          placeholder="Name"
          required
          value={name}
          onChange={onNameChange}
        />
      </Fieldset>
      <Fieldset legend="File content">
        <Textbox
          type="textarea"
          placeholder="Content"
          required
          value={content}
          onChange={onContentChange}
        />
      </Fieldset>
      <ButtonSubmit loading={loading}>Upload</ButtonSubmit>
    </form>
  );
}
