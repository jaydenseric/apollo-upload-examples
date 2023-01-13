// @ts-check

import { fileURLToPath } from "node:url";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware as apolloServerKoa } from "@as-integrations/koa";
import corsKoa from "@koa/cors";
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
import http from "http";
import Koa from "koa";
import bodyParserKoa from "koa-bodyparser";
import makeDir from "make-dir";

import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";
import schema from "./schema/index.mjs";

// Ensure the upload directory exists.
await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));

const app = new Koa();
const httpServer = http.createServer(app.callback());
const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await apolloServer.start();

app.use(corsKoa());
app.use(
  graphqlUploadKoa({
    // Limits here should be stricter than config for surrounding infrastructure
    // such as NGINX so errors can be handled elegantly by `graphql-upload`.
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  })
);
app.use(bodyParserKoa());
app.use(apolloServerKoa(apolloServer));

httpServer.listen(process.env.PORT, () => {
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  );
});
