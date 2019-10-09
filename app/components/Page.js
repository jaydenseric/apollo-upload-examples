import Head from 'next/head'

export const Page = ({ title, children }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </div>
)
