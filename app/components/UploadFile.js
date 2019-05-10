import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const S3_DOCUMENT_STORE_BUCKET = 'my-bucket'
const S3_DOCUMENT_STORE_KEY = 'reqs'

let s3Location = {}
s3Location = {
  bucket: S3_DOCUMENT_STORE_BUCKET,
  key: S3_DOCUMENT_STORE_KEY
}

const UPLOAD_FILE = gql`
  mutation singleUpload($input: DocumentInput!) {
    singleUpload(input: $input) {
      id
      fileName
      uploadedBy
      uploadedAt
    }
  }
`

const uploadOneFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    //eslint-disable-next-line
    console.log('iupload: ', file)
    const input = {
      config: {
        AMPLICON: 'amplicon',
        EMAILS: 'al@rc.com'
      },
      file,
      s3Location
    }

    return (
      validity.valid &&
      mutate({
        variables: { input }
      })
    )
  }

  return <input type="file" required onChange={handleChange} />
}

const enhancedUploadOneFile = graphql(UPLOAD_FILE)
const uploadFile = enhancedUploadOneFile(uploadOneFile)

export default uploadFile
