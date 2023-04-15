import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={''} />
      </Head>
      <body className=" bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
