import Page from '../components/Page'
import Section from '../components/Section'
// import UploadBlob from '../components/UploadBlob'
import UploadFile from '../components/UploadFile'
// import UploadFileList from '../components/UploadFileList'
// import Uploads from '../components/Uploads'

const IndexPage = () => (
  <Page title="Apollo upload examples">
    <Section heading="Upload File">
      <UploadFile />
    </Section>
  </Page>
)

export default IndexPage
