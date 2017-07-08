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
      <style>{`
      html {
        font-family: sans-serif;
      }
      body {
        margin: 2em;
      }
    `}</style>
    </Head>
    <h1>Apollo upload examples</h1>
    <Section heading="Single file upload">
      <p>Select an file to upload and view the response in the console.</p>
      <SingleUploader />
    </Section>
    <Section heading="Multiple file upload">
      <p>
        Select multiple files to upload and view the response in the console.
      </p>
      <MultipleUploader />
    </Section>
    <Section heading="Uploaded files">
      <UploadList />
    </Section>
  </div>

export default withData(HomePage)
