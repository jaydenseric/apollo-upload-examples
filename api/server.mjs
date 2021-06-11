import { createWriteStream, unlink } from 'fs';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlUploadKoa } from 'graphql-upload';
import Koa from 'koa';
// `eslint-plugin-node` doesn’t support the package `exports` field, see:
// https://github.com/mysticatea/eslint-plugin-node/issues/255
// eslint-disable-next-line node/no-missing-import
import { JSONFile, Low } from 'lowdb';
import makeDir from 'make-dir';
import shortId from 'shortid';
import schema from './schema/index.mjs';

const UPLOAD_DIR = new URL('uploads/', import.meta.url);
const db = new Low(new JSONFile('db.json'));

/**
 * Stores a GraphQL file upload. The file is stored in the filesystem and its
 * metadata is recorded in the DB.
 * @param {Promise<object>} upload GraphQL file upload.
 * @returns {Promise<object>} File metadata.
 */
async function storeUpload(upload) {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const id = shortId.generate();
  const path = new URL(`${id}-${filename}`, UPLOAD_DIR);
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

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on('error', (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  // Record the file metadata in the DB.
  await db.read();
  db.data.uploads.push(file);
  await db.write();

  return file;
}

const app = new Koa().use(
  graphqlUploadKoa({
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // `graphql-upload`:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  })
);

new ApolloServer({
  // Disable the built in file upload implementation that uses an outdated
  // `graphql-upload` version, see:
  // https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289
  uploads: false,
  schema,
  context: { db, storeUpload },
}).applyMiddleware({ app });

/**
 * Starts the API server.
 */
async function startServer() {
  await db.read();

  // Seed an empty DB.
  if (!db.data) {
    db.data = { uploads: [] };

    await db.write();
  }

  // Ensure upload directory exists.
  await makeDir(fileURLToPath(UPLOAD_DIR));

  app.listen(process.env.PORT, (error) => {
    if (error) throw error;

    console.info(
      `Serving http://localhost:${process.env.PORT} for ${process.env.NODE_ENV}.`
    );
  });
}

startServer();
