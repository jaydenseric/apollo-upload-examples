import Head from 'next/head'
import withData from '../helpers/with-data'
import Section from '../components/section'
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
    <h1>Apollo upload examples</h1>
    <p>Select files to upload and view the responses in the console.</p>
    <Section heading="Single file">
      <SingleUploader />
    </Section>
    <Section heading="Multiple files">
      <MultipleUploader />
    </Section>
    <Section heading="Uploaded files">
      <UploadList />
    </Section>
  </div>

export default withData(HomePage)
