import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const db = low(new FileSync('db.json'))
db.defaults({ uploads: [] }).write()

const saveFile = file =>
  db
    .get('uploads')
    .push({ id: file.path, ...file })
    .last()
    .write()

export default {
  Query: {
    uploads: () => db.get('uploads').value()
  },
  Mutation: {
    singleUpload: (_, { file }) => saveFile(file),
    multipleUpload: (_, { files }) => Promise.all(files.map(saveFile))
  }
}
