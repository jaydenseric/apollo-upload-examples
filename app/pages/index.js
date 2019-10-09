import { Code, Heading } from 'device-agnostic-ui'
import { Inset } from '../components/Inset'
import { Page } from '../components/Page'
import { Section } from '../components/Section'
import { UploadBlob } from '../components/UploadBlob'
import { UploadFile } from '../components/UploadFile'
import { UploadFileList } from '../components/UploadFileList'
import { Uploads } from '../components/Uploads'

const IndexPage = () => (
  <Page title="Apollo upload examples">
    <Section
      intro={
        <Heading>
          Upload <Code>FileList</Code>
        </Heading>
      }
    >
      <Inset>
        <UploadFileList />
      </Inset>
    </Section>
    <Section
      intro={
        <Heading>
          Upload <Code>File</Code>
        </Heading>
      }
    >
      <Inset>
        <UploadFile />
      </Inset>
    </Section>
    <Section
      intro={
        <Heading>
          Upload <Code>Blob</Code>
        </Heading>
      }
    >
      <Inset>
        <UploadBlob />
      </Inset>
    </Section>
    <Section intro={<Heading>Uploads</Heading>}>
      <Uploads />
    </Section>
  </Page>
)

export default IndexPage
