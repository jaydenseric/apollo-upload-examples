import { gql, useApolloClient, useMutation } from '@apollo/client';

const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;

export function UploadFileList() {
  const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onChange = ({ target: { validity, files } }) =>
    validity.valid &&
    multipleUploadMutation({ variables: { files } }).then(() => {
      apolloClient.resetStore();
    });

  return <input type="file" multiple required onChange={onChange} />;
}
