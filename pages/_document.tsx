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
          <link rel="alternate" type="application/rss+xml" title={`${SEO.person.name} RSS Feed`} href="/rss.xml" />

          <link rel="manifest" href={`${SEO.siteUrl}/site.webmanifest`} />

          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
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
