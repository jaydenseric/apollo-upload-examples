import { Code, Heading, Margin } from 'device-agnostic-ui';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { UploadBlob } from '../components/UploadBlob';
import { UploadFile } from '../components/UploadFile';
import { UploadFileList } from '../components/UploadFileList';
import { Uploads } from '../components/Uploads';

const IndexPage = () => (
  <Page title="Apollo upload examples">
    <Header>
      <Heading level={1} size={1}>
        Apollo upload examples
      </Heading>
    </Header>
    <Section>
      <Header>
        <Heading level={2} size={2}>
          Upload <Code>FileList</Code>
        </Heading>
      </Header>
      <Margin>
        <UploadFileList />
      </Margin>
    </Section>
    <Section>
      <Header>
        <Heading level={2} size={2}>
          Upload <Code>File</Code>
        </Heading>
      </Header>
      <Margin>
        <UploadFile />
      </Margin>
    </Section>
    <Section>
      <Header>
        <Heading level={2} size={2}>
          Upload <Code>Blob</Code>
        </Heading>
      </Header>
      <Margin>
        <UploadBlob />
      </Margin>
    </Section>
    <Section>
      <Header>
        <Heading>Uploads</Heading>
      </Header>
      <Uploads />
    </Section>
  </Page>
);

export default IndexPage;
