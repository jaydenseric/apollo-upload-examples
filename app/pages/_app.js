import 'device-agnostic-ui/public/theme.css';
import 'device-agnostic-ui/public/global.css';
import 'device-agnostic-ui/public/components/Button.css';
import 'device-agnostic-ui/public/components/ButtonSubmit.css';
import 'device-agnostic-ui/public/components/Code.css';
import 'device-agnostic-ui/public/components/Fieldset.css';
import 'device-agnostic-ui/public/components/Heading.css';
import 'device-agnostic-ui/public/components/Loading.css';
import 'device-agnostic-ui/public/components/Margin.css';
import 'device-agnostic-ui/public/components/Scroll.css';
import 'device-agnostic-ui/public/components/Table.css';
import 'device-agnostic-ui/public/components/Textbox.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import Head from 'next/head';
import PropTypes from 'prop-types';

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
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
      const { getDataFromTree } = await import('@apollo/client/react/ssr');
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
