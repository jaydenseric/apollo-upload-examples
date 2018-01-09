import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import koaStatic from 'koa-static'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlKoa } from 'graphql-server-koa'
import { apolloUploadKoa } from 'apollo-upload-server'
import types from './schema.mjs'
import resolvers from './resolvers.mjs'

const server = new Koa()
const router = new KoaRouter()

server
  // Enable Cross-Origin Resource Sharing (CORS)
  .use(cors())
  // Enable gzip
  .use(compress())
  .use(koaStatic('.'))

// GraphQL API
router.post(
  '/graphql',
  koaBody(),
  apolloUploadKoa(),
  graphqlKoa({
    schema: makeExecutableSchema({ typeDefs: [types], resolvers })
  })
)

server.use(router.routes()).use(router.allowedMethods())

server.listen(process.env.PORT, error => {
  if (error) throw new Error(error)

  // eslint-disable-next-line no-console
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})
