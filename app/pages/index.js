import Head from 'next/head'
import withData from '../helpers/with-data'
import SingleUploader from '../components/single-uploader'
import MultiUploader from '../components/multi-uploader'

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
          height: calc(50vh - 4em);
        }
      `}</style>
    </Head>
    <section>
      <h1>Apollo upload example (single file)</h1>
      <p>Select an image to upload and view the response in the console.</p>
      <SingleUploader />
    </section>
    <section>
      <h1>Apollo upload example (multiple files)</h1>
      <p>Select multiple images to upload and view the response in the console.</p>
      <MultiUploader />
    </section>
  </div>
))
