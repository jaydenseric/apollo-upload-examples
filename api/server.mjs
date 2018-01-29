import Koa from 'koa'
import cors from 'kcors'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { apolloUploadKoa } from 'apollo-upload-server'
import { graphqlKoa } from 'graphql-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema.mjs'
import resolvers from './resolvers.mjs'

const app = new Koa()
const router = new KoaRouter()
const schema = makeExecutableSchema({ typeDefs, resolvers })

router.post('/graphql', koaBody(), apolloUploadKoa(), graphqlKoa({ schema }))

app
  .use(cors())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.PORT, error => {
  if (error) throw error
  // eslint-disable-next-line no-console
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})
