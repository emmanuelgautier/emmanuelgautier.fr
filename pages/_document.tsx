import Document, { Html, Head, Main, NextScript } from 'next/document'

import SEO from '../next-seo.config'
import { GTM_ID } from '../lib/gtm'

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
            href={`https://${SEO.siteUrl}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`https://${SEO.siteUrl}/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`https://${SEO.siteUrl}/favicon-16x16.png`}
            sizes="16x16"
          />

          <link
            rel="manifest"
            href={`https://${SEO.siteUrl}/site.webmanifest`}
          />

          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GTM_ID}');`,
            }}
          />
        </Head>
        <body className="bg-gray-50 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
