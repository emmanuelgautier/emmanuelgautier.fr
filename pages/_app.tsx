import '../styles/globals.css'
import '../styles/prism.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import type { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import { GA_TRACKING_ID, pageview } from '@lib/gtm'
import type { MessageConfig } from '@lib/load-intl-messages'
import { getLocale } from '@lib/get-localized-domain'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ intlMessages: MessageConfig }>): React.ReactNode {
  const { asPath, basePath, locale = getLocale(), defaultLocale } = useRouter()
  const router = useRouter()

  const {
    publicRuntimeConfig: {
      seo: { openGraph, siteUrl, twitter },
    },
  } = getConfig()
  const url = `${siteUrl}${basePath}${asPath}`
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

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
