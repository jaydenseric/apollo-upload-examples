import "device-agnostic-ui/theme.css";
import "device-agnostic-ui/global.css";
import "device-agnostic-ui/Button.css";
import "device-agnostic-ui/ButtonSubmit.css";
import "device-agnostic-ui/Code.css";
import "device-agnostic-ui/Fieldset.css";
import "device-agnostic-ui/Heading.css";
import "device-agnostic-ui/Loading.css";
import "device-agnostic-ui/Margin.css";
import "device-agnostic-ui/Scroll.css";
import "device-agnostic-ui/Table.css";
import "device-agnostic-ui/Textbox.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Head from "next/head";
import PropTypes from "prop-types";
import { createElement as h } from "react";

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI }),
  });

const App = ({
  Component,
  pageProps,
  apolloCache,
  apolloClient = createApolloClient(apolloCache),
}) =>
  h(
    ApolloProvider,
    { client: apolloClient },
    h(
      Head,
      null,
      h("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      h("meta", { name: "color-scheme", content: "light dark" }),
      h("meta", { name: "theme-color", content: "white" }),
      h("link", { rel: "manifest", href: "/manifest.webmanifest" })
    ),
    h(Component, pageProps)
  );

App.getInitialProps = async (context) => {
  const props = {
    pageProps: context.Component.getInitialProps
      ? await context.Component.getInitialProps(context)
      : {},
  };

  if (context.ctx.req) {
    const apolloClient = createApolloClient();
    try {
      const { getDataFromTree } = await import("@apollo/client/react/ssr");
      await getDataFromTree(
        h(App, {
          ...props,
          apolloClient,
          router: context.router,
          Component: context.Component,
        })
      );
    } catch (error) {
      // Prevent crash from GraphQL errors.
      console.error(error);
    }

    props.apolloCache = apolloClient.cache.extract();
  }

  return props;
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
  apolloCache: PropTypes.object,
  apolloClient: PropTypes.instanceOf(ApolloClient),
};

export default App;
