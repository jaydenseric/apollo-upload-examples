import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { apolloUploadKoa } from 'apollo-upload-server'
import apolloServerKoa from 'apollo-server-koa'
import graphqlTools from 'graphql-tools'
import typeDefs from './schema.mjs'
import resolvers from './resolvers.mjs'

const router = new KoaRouter().post(
  '/graphql',
  koaBody(),
  apolloUploadKoa(),
  apolloServerKoa.graphqlKoa({
    schema: graphqlTools.makeExecutableSchema({ typeDefs, resolvers })
  })
)

new Koa()
  .use(cors())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, error => {
    if (error) throw error
    // eslint-disable-next-line no-console
    console.info(
      `Serving http://localhost:${process.env.PORT} for ${
        process.env.NODE_ENV
      }.`
    )
  })
