import { createElement as h } from "react";

import styles from "./Header.module.css";

export const Header = (props) =>
  h("header", { ...props, className: styles.header });
