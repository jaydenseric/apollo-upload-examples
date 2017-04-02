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
    }
  }
}
