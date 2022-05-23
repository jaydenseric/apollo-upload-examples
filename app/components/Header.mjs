// @ts-check

import { createElement as h } from "react";

import styles from "./Header.module.css";

/**
 * React component for a header.
 * @param {object} props Props.
 * @param {import("react").ReactNode} [props.children] Children.
 */
export default function Header({ children }) {
  return h("header", { className: styles.header }, children);
}
