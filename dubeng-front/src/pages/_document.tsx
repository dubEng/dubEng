import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body id='root' className='h-screen container mx-auto bg-dubpink bg-opacity-20 w-390'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
