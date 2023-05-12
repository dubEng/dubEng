import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body id='root' className='max-w-390 h-screen container mx-auto bg-dubpink'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
