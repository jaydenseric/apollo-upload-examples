import Head from 'next/head'
import withData from '../helpers/with-data'
import SingleUploader from '../components/single-uploader'
import MultiUploader from '../components/multi-uploader'
import UploadList from '../components/upload-list'

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
        section {
          padding-top: 3em;
        }
      `}</style>
    </Head>
    <h1>Apollo upload example</h1>
    <section>
      <h2>Single file upload</h2>
      <p>Select an image to upload and view the response in the console.</p>
      <SingleUploader />
    </section>
    <section>
      <h2>Multiple file upload</h2>
      <p>Select multiple images to upload and view the response in the console.</p>
      <MultiUploader />
    </section>
    <section>
      <UploadList />
    </section>
  </div>
))
