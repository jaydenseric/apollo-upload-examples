// @ts-check

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

import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache.js";
import { ApolloClient } from "@apollo/client/core/ApolloClient.js";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider.js";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import nextApp from "next/app.js";
import nextHead from "next/head.js";
import { createElement as h, Fragment } from "react";

/**
 * Creates an Apollo Client instance.
 * @param {import(
 *   "@apollo/client/cache/inmemory/types.js"
 * ).NormalizedCacheObject} [cache] Apollo Client initial cache.
 */
const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({
      uri: process.env.API_URI,
      headers: {
        "Apollo-Require-Preflight": "true",
      },
    }),
  });

/**
 * React component for the Next.js app.
 * @param {import("next/app.js").AppProps & AppCustomProps} props Props.
 */
function App({
  Component,
  pageProps,
  apolloCache,
  apolloClient = createApolloClient(apolloCache),
}) {
  return h(ApolloProvider, {
    client: apolloClient,
    children: h(
      Fragment,
      null,
      h(
        nextHead.default,
        null,
        h("meta", {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        }),
        h("meta", { name: "color-scheme", content: "light dark" }),
        h("meta", { name: "theme-color", content: "white" }),
        h("link", { rel: "manifest", href: "/manifest.webmanifest" }),
      ),
      h(Component, pageProps),
    ),
  });
}

if (typeof window === "undefined")
  App.getInitialProps =
    /** @param {import("next/app.js").AppContext} context */
    async function getInitialProps(context) {
      const apolloClient = createApolloClient();
      const [props, { default: ReactDOMServer }, { getMarkupFromTree }] =
        await Promise.all([
          nextApp.default.getInitialProps(context),
          import("react-dom/server"),
          import("@apollo/client/react/ssr/getDataFromTree.js"),
        ]);

      try {
        await getMarkupFromTree({
          tree: h(App, {
            ...props,
            apolloClient,
            router: context.router,
            Component: context.Component,
          }),
          renderFunction: ReactDOMServer.renderToStaticMarkup,
        });
      } catch (error) {
        // Prevent crash from GraphQL errors.
        console.error(error);
      }

      return {
        ...props,
        apolloCache: apolloClient.cache.extract(),
      };
    };

export default App;

/**
 * Next.js app custom props.
 * @typedef {object} AppCustomProps
 * @prop {import(
 *   "@apollo/client/cache/inmemory/types.js"
 * ).NormalizedCacheObject} [apolloCache] Apollo Client initial cache.
 * @prop {ApolloClient<any>} apolloClient Apollo Client.
 */
