import low from 'lowdb'
import storage from 'lowdb/lib/storages/file-async'

const db = low('db.json', {
  storage
})

db
  .defaults({
    uploads: []
  })
  .write()

const saveFile = file => {
  return db
    .get('uploads')
    .push({
      id: file.path,
      ...file
    })
    .last()
    .write()
    .then(result => result)
}

export default {
  Query: {
    uploads() {
      return db.get('uploads').value()
    }
  },
  Mutation: {
    singleUpload: (_, { file }) => saveFile(file),
    multipleUpload(_, { files }) {
      return Promise.all(files.map(file => saveFile(file))).then(
        results => results
      )
    }
  }
}
