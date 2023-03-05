import '@fontsource/roboto'
import '../styles/globals.css'
import '../styles/prism.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import type { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { IntlProvider } from 'react-intl'

import type { MessageConfig } from '@lib/load-intl-messages'
import { getLocale } from '@lib/get-localized-domain'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ intlMessages: MessageConfig }>): React.ReactNode {
  const { asPath, basePath, locale = getLocale(), defaultLocale } = useRouter()
  const {
    publicRuntimeConfig: {
      seo: { analyticsDomain, openGraph, siteUrl, twitter },
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

      <PlausibleProvider
        domain={analyticsDomain}
        customDomain={`https://a.${analyticsDomain}`}
        selfHosted={true}
        trackOutboundLinks={true}
      >
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
      </PlausibleProvider>
    </>
  )
}

export default MyApp
