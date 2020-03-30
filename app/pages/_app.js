import 'cross-fetch/polyfill';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { stylesGlobal, stylesGlobalTheme } from 'device-agnostic-ui';
import Head from 'next/head';

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI }),
  });

const App = ({
  Component,
  pageProps,
  apolloCache,
  apolloClient = createApolloClient(apolloCache),
}) => (
  <ApolloProvider client={apolloClient}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="light dark" />
      <meta name="theme-color" content="white" />
      <link rel="manifest" href="/manifest.webmanifest" />
    </Head>
    <Component {...pageProps} />
    <style jsx global>
      {stylesGlobalTheme}
    </style>
    <style jsx global>
      {stylesGlobal}
    </style>
  </ApolloProvider>
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
      const { getDataFromTree } = await import('@apollo/react-ssr');
      await getDataFromTree(
        <App
          {...props}
          apolloClient={apolloClient}
          router={context.router}
          Component={context.Component}
        />
      );
    } catch (error) {
      // Prevent crash from GraphQL errors.
      console.error(error);
    }

    Head.rewind();

    props.apolloCache = apolloClient.cache.extract();
  }

  return props;
};

export default App;
