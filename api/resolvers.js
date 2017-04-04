import getRethinkDB from './rethinkdb'

const getNewVal = (result) => {
  if (result.changes.length === 1) {
    return result.changes[0].new_val
  }
  return result.changes.map((file) => file.new_val)
}

export default {
  Query: {
    allUploads () {
      const db = getRethinkDB()
      return db.table('uploads')
    }
  },
  Mutation: {
    singleUpload (_, {file}) {
      const db = getRethinkDB()
      const result = db.table('uploads')
        .insert(file, {returnChanges: true})
      return getNewVal(result)
    },
    multiUpload (_, {files}) {
      const db = getRethinkDB()
      const result = db.table('uploads')
        .insert(files, {returnChanges: true})
      return getNewVal(result)
    }
  }
}
