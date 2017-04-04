import path from 'path'

export const distPath = path.resolve(__dirname, 'dist')
export const apiEndpoint = '/graphql'
export const rethinkdb = {
  host: 'localhost',
  port: 28015,
  db: 'test'
}
