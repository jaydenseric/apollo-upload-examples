import Head from 'next/head'
import withData from '../helpers/with-data'
import SingleUploader from '../components/single-uploader'
import MultipleUploader from '../components/multiple-uploader'
import UploadList from '../components/upload-list'

const HomePage = () =>
  <div>
    <Head>
      <title>Apollo upload examples</title>
      <style>
        {`
          html {
            font-family: sans-serif;
            color: white;
            background-color: #22a699;
          }
          body {
            margin: 2em;
          }
        `}
      </style>
    </Head>
    <SingleUploader />
    <MultipleUploader />
    <UploadList />
  </div>

export default withData(HomePage)
