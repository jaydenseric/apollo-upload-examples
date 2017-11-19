import Page from '../components/page'
import SingleUploader from '../components/single-uploader'
import MultipleUploader from '../components/multiple-uploader'
import UploadList from '../components/upload-list'
import withData from '../providers/with-data'

const HomePage = () => (
  <Page title="Apollo upload examples">
    <img
      src="/static/apollo-upload-logo.svg"
      width="170"
      height="128"
      alt="Apollo upload logo"
    />
    <SingleUploader />
    <MultipleUploader />
    <UploadList />
  </Page>
)

export default withData(HomePage)
