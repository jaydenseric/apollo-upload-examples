import Head from "next/head";
import PropTypes from "prop-types";
import { createElement as h, Fragment } from "react";

export const Page = ({ title, children }) =>
  h(Fragment, null, h(Head, null, h("title", null, title)), children);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
