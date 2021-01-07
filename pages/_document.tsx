import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head />
        <body className="bg-gray-50 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
