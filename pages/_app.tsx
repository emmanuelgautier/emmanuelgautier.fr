import { useAmp } from 'next/amp'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { IntlConfig, IntlProvider } from 'react-intl'

import { polyfill } from '../polyfills'

import SEO from '../next-seo.config'

import '@fontsource/open-sans'
import '../styles/globals.css'
import '../styles/prism.css'

type Props = Pick<IntlConfig, 'messages' | 'locale'> & AppProps

function MyApp({ Component, pageProps, messages, locale }: Props) {
  const router = useRouter()
  const isAmp = useAmp()
  const { asPath, basePath } = router
  const foundDomain = SEO.i18n.domains.find(
    ({ defaultLocale: domainLocale }) => domainLocale === locale
  )
  const currentLocaleURL = foundDomain ? foundDomain.domain : SEO.siteUrl
  const siteUrl = `${currentLocaleURL}${basePath}`
  const canonicalUrl = getLocalizedUrl(currentLocaleURL, basePath, asPath)

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
            siteUrl,
            canonical: canonicalUrl,

            languageAlternates: SEO.i18n.domains?.map(
              ({ domain, defaultLocale }) => ({
                hrefLang: defaultLocale,
                href: getLocalizedUrl(domain, basePath, asPath),
              })
            ),

            openGraph: {
              url: siteUrl,
              locale,
              ...SEO.openGraph,
            },

            twitter: SEO.twitter,
          }}
        />
        <Component {...pageProps} />
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
function getMessages(locales: string | string[] = ['en']) {
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
  return [locale, langBundle]
}

function getLocalizedUrl(url: string, basePath: string, path: string) {
  return `${url}${basePath}${path}`
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
