import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;

export const UploadFileList = () => {
  const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onChange = ({ target: { validity, files } }) =>
    validity.valid &&
    multipleUploadMutation({ variables: { files } }).then(() => {
      apolloClient.resetStore();
    });

  return <input type="file" multiple required onChange={onChange} />;
};
