// @ts-check

import { createElement as h } from "react";

import styles from "./Section.module.css";

/**
 * React component for a section.
 * @param {object} props Props.
 * @param {import("react").ReactNode} [props.children] Children.
 */
export default function Section({ children }) {
  return h("section", { className: styles.section }, children);
}
