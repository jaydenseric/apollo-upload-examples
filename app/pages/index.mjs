// @ts-check

import Code from "device-agnostic-ui/Code.mjs";
import Heading from "device-agnostic-ui/Heading.mjs";
import Margin from "device-agnostic-ui/Margin.mjs";
import { createElement as h } from "react";

import Header from "../components/Header.mjs";
import Page from "../components/Page.mjs";
import Section from "../components/Section.mjs";
import UploadBlob from "../components/UploadBlob.mjs";
import UploadFile from "../components/UploadFile.mjs";
import UploadFileList from "../components/UploadFileList.mjs";
import Uploads from "../components/Uploads.mjs";

export default function IndexPage() {
  return h(
    Page,
    { title: "Apollo upload examples" },
    h(
      Header,
      null,
      h(Heading, { level: 1, size: 1 }, "Apollo upload examples"),
    ),
    h(
      Section,
      null,
      h(
        Header,
        null,
        h(Heading, { level: 2, size: 2 }, "Upload ", h(Code, null, "FileList")),
      ),
      h(Margin, null, h(UploadFileList)),
    ),
    h(
      Section,
      null,
      h(
        Header,
        null,
        h(Heading, { level: 2, size: 2 }, "Upload ", h(Code, null, "File")),
      ),
      h(Margin, null, h(UploadFile)),
    ),
    h(
      Section,
      null,
      h(
        Header,
        null,
        h(Heading, { level: 2, size: 2 }, "Upload ", h(Code, null, "Blob")),
      ),
      h(Margin, null, h(UploadBlob)),
    ),
    h(Section, null, h(Header, null, h(Heading, null, "Uploads")), h(Uploads)),
  );
}
