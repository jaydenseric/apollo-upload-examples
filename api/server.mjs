import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import graphqlTools from 'graphql-tools'
import graphqlServerKoa from 'graphql-server-koa'
import apolloUploadServer from 'apollo-upload-server'
import types from './schema.mjs'
import resolvers from './resolvers.mjs'

const server = new Koa()
const router = new KoaRouter()

server
  // Enable Cross-Origin Resource Sharing (CORS)
  .use(cors())
  // Enable gzip
  .use(compress())
  // Parse body
  .use(koaBody())

// GraphQL API
router.post(
  '/graphql',
  apolloUploadServer.apolloUploadKoa({ uploadDir: './uploads' }),
  graphqlServerKoa.graphqlKoa({
    schema: graphqlTools.makeExecutableSchema({ typeDefs: [types], resolvers })
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
