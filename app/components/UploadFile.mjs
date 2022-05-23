// @ts-check

import { gql } from "@apollo/client/core";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient.js";
import { useMutation } from "@apollo/client/react/hooks/useMutation.js";
import { createElement as h } from "react";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

/** React component for a uploading a single file. */
export default function UploadFile() {
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  /** @type {import("react").ChangeEventHandler<HTMLInputElement>} */
  function onChange({ target: { validity, files } }) {
    if (validity.valid && files && files[0])
      uploadFileMutation({ variables: { file: files[0] } }).then(() => {
        apolloClient.resetStore();
      });
  }

  return h("input", { type: "file", required: true, onChange });
}
