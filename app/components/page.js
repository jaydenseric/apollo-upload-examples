import Head from 'next/head'

const Page = ({ title, children }) =>
  <div>
    <Head>
      <title>
        {title}
      </title>
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
    {children}
  </div>

export default Page
