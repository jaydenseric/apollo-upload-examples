// @ts-check

import nextHead from "next/head.js";
import { createElement as h, Fragment } from "react";

/**
 * React component for a page.
 * @param {object} props Props.
 * @param {string} props.title Title.
 * @param {import("react").ReactNode} [props.children] Children.
 */
export default function Page({ title, children }) {
  return h(
    Fragment,
    null,
    h(nextHead.default, null, h("title", null, title)),
    children
  );
}
