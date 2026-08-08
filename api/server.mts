import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware as apolloServerKoa } from "@as-integrations/koa";
import corsKoa from "@koa/cors";
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
import Koa from "koa";
import bodyParserKoa from "@koa/bodyparser";

import UPLOAD_DIRECTORY_URL from "./constants/UPLOAD_DIRECTORY_URL.mts";
import schema from "./schema/index.mts";

// Ensure the upload directory exists.
await mkdir(UPLOAD_DIRECTORY_URL, { recursive: true });

const app = new Koa();
const httpServer = createServer(app.callback());
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
  }),
);
app.use(bodyParserKoa());
app.use(apolloServerKoa(apolloServer));

/** Port to serve on. */
const port = 3001;

httpServer.listen(port, () => {
  console.info(`Serving: http://localhost:${port}`);
});
