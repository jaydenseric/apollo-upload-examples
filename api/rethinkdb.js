import rethinkdbdash from 'rethinkdbdash'

let driver
export default () => {
  if (!driver) {
    driver = rethinkdbdash({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      db: process.env.DB_NAME
    })
  }
  return driver
}
