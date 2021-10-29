import '../styles/globals.css'
import '../styles/prism.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { IntlProvider } from 'react-intl'

import SEO from '../next-seo.config.js'

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const {
    asPath,
    basePath,
    locale = process.env.LOCALE as string,
    defaultLocale,
  } = useRouter()
  const url = `${SEO.siteUrl}${basePath}${asPath}`

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={pageProps.intlMessages}
      >
        <DefaultSeo
          {...{
            siteUrl: SEO.siteUrl,

            openGraph: {
              url,
              locale,
              ...SEO.openGraph,
            },

            twitter: SEO.twitter,
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
