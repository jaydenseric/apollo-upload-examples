const { createWriteStream, unlink } = require('fs')
const { ApolloServer } = require('apollo-server-koa')
const Koa = require('koa')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const mkdirp = require('mkdirp')
const shortid = require('shortid')
const { schema } = require('./schema')

const UPLOAD_DIR = './uploads'
const db = lowdb(new FileSync('db.json'))

// Seed an empty DB.
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR)

/**
 * Stores a GraphQL file upload. The file is stored in the filesystem and its
 * metadata is recorded in the DB.
 * @param {GraphQLUpload} upload GraphQL file upload.
 * @returns {object} File metadata.
 */
const storeUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload
  const stream = createReadStream()
  const id = shortid.generate()
  const path = `${UPLOAD_DIR}/${id}-${filename}`
  const file = { id, filename, mimetype, path }

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    stream
      .on('error', error => {
        unlink(path, () => {
          reject(error)
        })
      })
      .pipe(createWriteStream(path))
      .on('error', reject)
      .on('finish', resolve)
  })

  // Record the file metadata in the DB.
  db.get('uploads')
    .push(file)
    .write()

  return file
}

const app = new Koa()
const server = new ApolloServer({
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  schema,
  context: { db, storeUpload }
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, error => {
  if (error) throw error

  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  )
})

// See https://github.com/mike-marcacci/fs-capacitor#ensuring-cleanup-on-termination-by-process-signal
function shutdown() {
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown);
