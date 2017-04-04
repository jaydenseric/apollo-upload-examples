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
      .then((result) => result)
    }
  },
  Mutation: {
    singleUpload (_, {file}) {
      const db = getRethinkDB()
      return db.table('uploads')
      .insert(file, {returnChanges: true})
      .then((result) => getNewVal(result))
    },
    multiUpload (_, {files}) {
      const db = getRethinkDB()
      return db.table('uploads')
      .insert(files, {returnChanges: true})
      .then((result) => getNewVal(result))
    }
  }
}
