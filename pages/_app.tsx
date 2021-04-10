import '@fontsource/open-sans'
import '../styles/globals.css'
import '../styles/prism.css'

import { useAmp } from 'next/amp'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { IntlConfig, IntlProvider } from 'react-intl'

import { polyfill } from '../polyfills'

import SEO from '../next-seo.config'

type Props = Pick<IntlConfig, 'messages' | 'locale'> & AppProps

function MyApp({ Component, pageProps, messages, locale }: Props) {
  const router = useRouter()
  const isAmp = useAmp()
  const { asPath, basePath } = router
  const url = `${SEO.siteUrl}${basePath}${asPath}`

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />

        {!isAmp && (
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        )}
      </Head>

      <IntlProvider
        locale={locale}
        defaultLocale={SEO.i18n.defaultLocale}
        messages={messages}
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

/**
 * Get the messages and also do locale negotiation. A multi-lingual user
 * can specify locale prefs like ['ja', 'en-GB', 'en'] which is interpreted as
 * Japanese, then British English, then English
 * @param locales list of requested locales
 * @returns {[string, Promise]} A tuple containing the negotiated locale
 * and the promise of fetching the translated messages
 */
function getMessages(locales: string | string[] = ['en']): [string, Promise<any>] {
  if (!Array.isArray(locales)) {
    locales = [locales]
  }
  let langBundle
  let locale
  for (let i = 0; i < locales.length && !locale; i++) {
    locale = locales[i]
    switch (locale) {
      case 'en':
        langBundle = import('../compiled-lang/en.json')
        break
      case 'fr':
        langBundle = import('../compiled-lang/fr.json')
        break
      default:
        break
    }
  }
  if (!langBundle) {
    return ['en', import('../compiled-lang/en.json')]
  }
  return [locale as string, langBundle]
}

const getInitialProps: typeof App.getInitialProps = async appContext => {
  const locale = appContext.router.locale || process.env.NEXT_LOCALE
  const [supportedLocale, messagePromise] = getMessages(locale)

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale),
    messagePromise,
    App.getInitialProps(appContext),
  ])

  return {
    ...(appProps as any),
    locale: supportedLocale,
    messages: messages.default,
  }
}

MyApp.getInitialProps = getInitialProps

export default MyApp
