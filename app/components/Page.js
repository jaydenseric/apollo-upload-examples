import Head from "next/head";
import PropTypes from "prop-types";

export const Page = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
