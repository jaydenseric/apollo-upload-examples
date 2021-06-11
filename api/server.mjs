import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlUploadKoa } from 'graphql-upload';
import Koa from 'koa';
import makeDir from 'make-dir';
import UPLOAD_DIRECTORY_URL from './config/UPLOAD_DIRECTORY_URL.mjs';
import schema from './schema/index.mjs';

const app = new Koa().use(
  graphqlUploadKoa({
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // `graphql-upload`:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  })
);

new ApolloServer({
  // Disable the built in file upload implementation that uses an outdated
  // `graphql-upload` version, see:
  // https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289
  uploads: false,
  schema,
}).applyMiddleware({ app });

/**
 * Starts the API server.
 */
async function startServer() {
  // Ensure the upload directory exists.
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));

  app.listen(process.env.PORT, (error) => {
    if (error) throw error;

    console.info(
      `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
    );
  });
}

startServer();
