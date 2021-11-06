import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const {
      publicRuntimeConfig: {
        seo: { person, siteUrl },
      },
    } = getConfig()

    return (
      <Html lang={process.env.LOCALE}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${siteUrl}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${siteUrl}/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${siteUrl}/favicon-16x16.png`}
            sizes="16x16"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`${person.name} RSS Feed`}
            href="/rss.xml"
          />

          <link rel="manifest" href={`${siteUrl}/site.webmanifest`} />

          <link
            rel="preconnect"
            href="https://www.googletagmanager.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/inter/inter-latin-variable-full-normal.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body className="bg-white dark:bg-black text-white dark:text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
