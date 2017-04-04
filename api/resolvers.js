import getRethinkDB from './rethinkdb'

const getNewVal = (result) => {
  if (result.changes.length === 1) {
    return result.changes[0].new_val
  }
  return result.changes.map((file) => file.new_val)
}

export default {
  Query: {
    ignore () {
      return null
    }
  },
  Mutation: {
    async singleUpload (_, {file}) {
      const db = getRethinkDB()
      const result = await db.table('uploads')
        .insert(file, {returnChanges: true})
      return getNewVal(result)
    },
    async multiUpload (_, {files}) {
      const db = getRethinkDB()
      const result = await db.table('uploads')
        .insert(files, {returnChanges: true})
      return getNewVal(result)
    }
  }
}
