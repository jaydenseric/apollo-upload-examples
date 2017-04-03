import Head from 'next/head'
import withData from '../helpers/with-data'
import SingleUploader from '../components/single-uploader'

export default withData(props => (
  <div>
    <Head>
      <title>Apollo upload example</title>
      <style>{`
        html {
          font-family: sans-serif;
        }
        body {
          margin: 2em;
        }
      `}</style>
    </Head>
    <h1>Apollo upload example</h1>
    <p>Select an image to upload and view the response in the console.</p>
    <SingleUploader />
  </div>
))
