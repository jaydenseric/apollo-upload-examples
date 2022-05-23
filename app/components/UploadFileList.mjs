// @ts-check

import { gql } from "@apollo/client/core";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient.js";
import { useMutation } from "@apollo/client/react/hooks/useMutation.js";
import { createElement as h } from "react";

const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;

/**
 * @typedef {{
 *   multipleUpload: {
 *     id: string,
 *   },
 * }} MultipleUploadMutationData
 */

/** React component for a uploading a file list. */
export default function UploadFileList() {
  const [multipleUploadMutation] =
    /**
     * @type {import("@apollo/client/react/types/types.js").MutationTuple<
     *   MultipleUploadMutationData,
     *   { files: FileList }
     * >}
     */
    (useMutation(MULTIPLE_UPLOAD_MUTATION));
  const apolloClient = useApolloClient();

  /** @type {import("react").ChangeEventHandler<HTMLInputElement>} */
  function onChange({ target: { validity, files } }) {
    if (validity.valid && files && files[0])
      multipleUploadMutation({ variables: { files } }).then(() => {
        apolloClient.resetStore();
      });
  }

  return h("input", { type: "file", multiple: true, required: true, onChange });
}
