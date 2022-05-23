// @ts-check

import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react/hooks/useQuery.js";
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

/**
 * @typedef {{
 *   uploads: Array<{
 *     id: string,
 *     url: string
 *   }>,
 * }} UploadsQueryData
 */

/** React component for displaying uploads. */
export default function Uploads() {
  const { data: { uploads = [] } = {} } =
    /**
     * @type {import("@apollo/client/react/types/types.js").QueryResult<
     *   UploadsQueryData
     * >}
     */
    (useQuery(UPLOADS_QUERY));

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
