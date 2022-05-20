import { gql, useApolloClient, useMutation } from "@apollo/client";
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

export function UploadBlob() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [singleUploadMutation, { loading }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );
  const apolloClient = useApolloClient();

  const onNameChange = ({ target: { value } }) => setName(value);
  const onContentChange = ({ target: { value } }) => setContent(value);
  const onSubmit = (event) => {
    event.preventDefault();

    const file = new Blob([content], { type: "text/plain" });
    file.name = `${name}.txt`;

    singleUploadMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });
  };

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
