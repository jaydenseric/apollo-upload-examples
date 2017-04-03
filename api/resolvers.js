export default {
  Query: {
    ignore () {
      return null
    }
  },
  Mutation: {
    singleUpload (root, {file}) {
      console.log('Uploaded file:', file)
      return file
    },
    multiUpload (root, {files}) {
      console.log('Uploaded files:', files)
      return files
    }
  }
}
