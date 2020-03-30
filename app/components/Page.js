import Head from 'next/head';

export const Page = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);
