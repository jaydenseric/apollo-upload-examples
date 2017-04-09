import low from 'lowdb'
import fileAsync from 'lowdb/lib/storages/file-async'

// Start database using file-async storage
const db = low('db.json', {
  storage: fileAsync
})

db.defaults({uploads: []})
  .write()

const saveFile = file => {
  return db.get('uploads')
    .push(file)
    .last()
    .write()
    .then(result => result)
}
export default {
  Query: {
    allUploads () {
      return db.get('uploads').value()
    }
  },
  Mutation: {
    singleUpload (_, {file}) {
      return saveFile(file)
    },
    multipleUpload (_, {files}) {
      return Promise.all(files.map((file) => {
        return saveFile(file)
      })).then(results => results)
    }
  }
}
