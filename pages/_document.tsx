import Document, { Html, Head, Main, NextScript } from 'next/document'

import SEO from '../next-seo.config'

interface Props {
  locale: string
}

export default class MyDocument extends Document<Props> {
  render() {
    const { locale = process.env.DEFAULT_LOCALE } = this.props

    return (
      <Html lang={locale}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${SEO.siteUrl}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${SEO.siteUrl}/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${SEO.siteUrl}/favicon-16x16.png`}
            sizes="16x16"
          />

          <link rel="manifest" href={`${SEO.siteUrl}/site.webmanifest`} />
        </Head>
        <body className="bg-gray-50 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
