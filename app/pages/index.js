import Page from '../components/Page'
import Section from '../components/Section'
import UploadFile from '../components/UploadFile'
import UploadFileList from '../components/UploadFileList'
import UploadBlob from '../components/UploadBlob'
import Uploads from '../components/Uploads'

const IndexPage = () => (
  <Page title="Apollo upload examples">
    <Section heading="Upload FileList">
      <UploadFileList />
    </Section>
    <Section heading="Upload File">
      <UploadFile />
    </Section>
    <Section heading="Upload Blob">
      <UploadBlob />
    </Section>
    <Section heading="Uploads">
      <Uploads />
    </Section>
  </Page>
)

export default IndexPage
