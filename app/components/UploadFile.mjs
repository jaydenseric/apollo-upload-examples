import { gql, useApolloClient, useMutation } from "@apollo/client";
import { createElement as h } from "react";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

export function UploadFile() {
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid &&
    uploadFileMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });

  return h("input", { type: "file", required: true, onChange });
}
