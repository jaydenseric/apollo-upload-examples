// @ts-check

import { fileURLToPath } from "node:url";

import { ApolloServer } from "apollo-server-koa";
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
import Koa from "koa";
import makeDir from "make-dir";

import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";
import schema from "./schema/index.mjs";

/** Starts the API server. */
async function startServer() {
  // Ensure the upload directory exists.
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  new Koa()
    .use(
      graphqlUploadKoa({
        // Limits here should be stricter than config for surrounding
        // infrastructure such as Nginx so errors can be handled elegantly by
        // `graphql-upload`.
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20,
      })
    )
    .use(apolloServer.getMiddleware())
    .listen(process.env.PORT, () => {
      console.info(
        `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
      );
    });
}

startServer();
