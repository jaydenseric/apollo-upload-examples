import low from 'lowdb'
import storage from 'lowdb/lib/storages/file-async'

const db = low('db.json', { storage })
db.defaults({ uploads: [] }).write()

const saveFile = file =>
  db.get('uploads').push({ id: file.path, ...file }).last().write()

export default {
  Query: {
    uploads: () => db.get('uploads').value()
  },
  Mutation: {
    singleUpload: (_, { file }) => saveFile(file),
    multipleUpload: (_, { files }) => Promise.all(files.map(saveFile))
  }
}
