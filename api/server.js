import 'source-map-support/register'
import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import {makeExecutableSchema} from 'graphql-tools'
import {graphqlKoa} from 'graphql-server-koa'
import {apolloUploadKoa} from 'apollo-upload-server'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'

const app = new Koa()
const router = new KoaRouter()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Enable gzip
app.use(compress())

// Parse body
app.use(koaBody())

// GraphQL API
router.post(
  '/graphql',
  apolloUploadKoa({
    uploadDir: '/tmp/uploads'
  }),
  graphqlKoa({
    schema
  })
)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.PORT)
console.log(`Serving at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
