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
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

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

          {/* Google Tag Manager - Global base code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
            }}
          />
        </Head>
        <body className="bg-gray-50 antialiased">
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
