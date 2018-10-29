import Koa from 'koa'
import apolloServerKoa from 'apollo-server-koa'
import { graphqlUploadKoa } from 'graphql-upload'
import typeDefs from './types'
import resolvers from './resolvers'

const app = new Koa().use(
  graphqlUploadKoa({
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  })
)

const server = new apolloServerKoa.ApolloServer({
  typeDefs,
  resolvers,

  // Disable outdated built in uploads, to setup graphql-upload instead.
  uploads: false
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, error => {
  if (error) throw error

  // eslint-disable-next-line no-console
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})
