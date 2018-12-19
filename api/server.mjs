import apolloServerKoa from 'apollo-server-koa'
import Koa from 'koa'
import resolvers from './resolvers'
import typeDefs from './types'

const app = new Koa()
const server = new apolloServerKoa.ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, error => {
  if (error) throw error

  // eslint-disable-next-line no-console
  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})
