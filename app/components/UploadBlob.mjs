// @ts-check

import { gql } from "@apollo/client/core";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient.js";
import { useMutation } from "@apollo/client/react/hooks/useMutation.js";
import ButtonSubmit from "device-agnostic-ui/ButtonSubmit.mjs";
import Code from "device-agnostic-ui/Code.mjs";
import Fieldset from "device-agnostic-ui/Fieldset.mjs";
import Textbox from "device-agnostic-ui/Textbox.mjs";
import { createElement as h, Fragment, useState } from "react";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

/** React component for a uploading a blob. */
export default function UploadBlob() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [singleUploadMutation, { loading }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );
  const apolloClient = useApolloClient();

  /**
   * @type {import("react").ChangeEventHandler<
   *   HTMLInputElement | HTMLTextAreaElement
   * >}
   */
  function onNameChange({ target: { value } }) {
    setName(value);
  }

  /**
   * @type {import("react").ChangeEventHandler<
   *   HTMLInputElement | HTMLTextAreaElement
   * >}
   */
  function onContentChange({ target: { value } }) {
    setContent(value);
  }

  /** @type {import("react").FormEventHandler<HTMLFormElement>} */
  function onSubmit(event) {
    event.preventDefault();

    singleUploadMutation({
      variables: {
        file: new File([content], `${name}.txt`, { type: "text/plain" }),
      },
    }).then(() => {
      apolloClient.resetStore();
    });
  }

  return h(
    "form",
    { onSubmit },
    h(
      Fieldset,
      {
        legend: h(
          Fragment,
          null,
          "File name (without ",
          h(Code, null, ".txt"),
          ")"
        ),
      },
      h(Textbox, {
        placeholder: "Name",
        required: true,
        value: name,
        onChange: onNameChange,
      })
    ),
    h(
      Fieldset,
      { legend: "File content" },
      h(Textbox, {
        type: "textarea",
        placeholder: "Content",
        required: true,
        value: content,
        onChange: onContentChange,
      })
    ),
    h(ButtonSubmit, { loading }, "Upload")
  );
}
