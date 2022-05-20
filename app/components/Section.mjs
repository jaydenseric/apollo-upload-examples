import { createElement as h } from "react";

import styles from "./Section.module.css";

export const Section = (props) =>
  h("section", { ...props, className: styles.section });
