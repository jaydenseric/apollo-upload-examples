'use strict';

const { createWriteStream, unlink } = require('fs');
const { ApolloServer } = require('apollo-server-koa');
const Koa = require('koa');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const { schema } = require('./schema');

const UPLOAD_DIR = './uploads';
const db = lowdb(new FileSync('db.json'));

// Seed an empty DB.
db.defaults({ uploads: [] }).write();

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

/**
 * Stores a GraphQL file upload. The file is stored in the filesystem and its
 * metadata is recorded in the DB.
 * @param {GraphQLUpload} upload GraphQL file upload.
 * @returns {object} File metadata.
 */
const storeUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  const file = { id, filename, mimetype, path };

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);

    // When the upload is fully written, resolve the promise.
    writeStream.on('finish', resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on('error', (error) => {
      unlink(path, () => {
        reject(error);
      });
    });

    // In node <= 13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on('error', (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  // Record the file metadata in the DB.
  db.get('uploads').push(file).write();

  return file;
};

const app = new Koa();
const server = new ApolloServer({
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  schema,
  context: { db, storeUpload },
});

server.applyMiddleware({ app });

app.listen(process.env.PORT, (error) => {
  if (error) throw error;

  console.info(
    `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
  );
});
