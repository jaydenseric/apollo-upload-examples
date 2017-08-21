import 'source-map-support/register'
import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlKoa } from 'graphql-server-koa'
import { apolloUploadKoa } from 'apollo-upload-server'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'

const app = new Koa()
const router = new KoaRouter()
const schema = makeExecutableSchema({ typeDefs, resolvers })

app
  // Enable Cross-Origin Resource Sharing (CORS)
  .use(cors())
  // Enable gzip
  .use(compress())
  // Parse body
  .use(koaBody())

// GraphQL API
router.post(
  '/graphql',
  apolloUploadKoa({ uploadDir: './uploads' }),
  graphqlKoa({ schema })
)

app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT)

// eslint-disable-next-line no-console
console.info(
  `Serving at http://localhost:${process.env.PORT} in ${process.env
    .NODE_ENV} mode.`
)
