import { gql, useQuery } from "@apollo/client";
import Scroll from "device-agnostic-ui/Scroll.mjs";
import Table from "device-agnostic-ui/Table.mjs";
import { createElement as h } from "react";

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
      id
      url
    }
  }
`;

export function Uploads() {
  const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY);

  return h(
    Scroll,
    null,
    h(
      Table,
      null,
      h("thead", null, h("tr", null, h("th", null, "Stored file URL"))),
      h(
        "tbody",
        null,
        uploads.map(({ id, url }) => h("tr", { key: id }, h("td", null, url)))
      )
    )
  );
}
