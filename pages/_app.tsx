import '../styles/globals.css'
import '../styles/prism.css'

import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { IntlProvider } from 'react-intl'

import { GTM_ID } from '@lib/gtm'

const cloudflareInsightsToken = process.env.CLOUDFLARE_INSIGHTS_TOKEN

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const {
    asPath,
    basePath,
    locale = process.env.LOCALE as string,
    defaultLocale,
  } = useRouter()
  const {
    publicRuntimeConfig: {
      seo: { openGraph, siteUrl, twitter },
    },
  } = getConfig()
  const url = `${siteUrl}${basePath}${asPath}`

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {GTM_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            onLoad={() => {
              window.dataLayer = window.dataLayer || []
              function gtag(...args: any[]) {
                window.dataLayer.push(args)
              }

              gtag('js', new Date())
              gtag('config', '${GTM_ID}')
            }}
          />
        </>
      )}

      {cloudflareInsightsToken && (
        <Script
          strategy="lazyOnload"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cloudflareInsightsToken}"}`}
        ></Script>
      )}

      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={pageProps.intlMessages}
      >
        <DefaultSeo
          {...{
            siteUrl,

            openGraph: {
              url,
              locale,
              ...openGraph,
            },

            twitter,
          }}
        />
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </>
  )
}

export default MyApp
