import '@fontsource/open-sans'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { IntlConfig, IntlProvider } from 'react-intl'

import { polyfill } from '../polyfills'

import SEO from '../next-seo.config'

import '../styles/globals.css'

type Props = Pick<IntlConfig, 'messages' | 'locale'> & AppProps

function MyApp({ Component, pageProps, messages, locale }: Props) {
  const router = useRouter()
  const { asPath, basePath } = router
  const foundDomain = SEO.i18n.domains.find(
    ({ defaultLocale: domainLocale }) => domainLocale === locale
  )
  const currentLocaleDomain = foundDomain ? foundDomain.domain : SEO.siteUrl

  const siteUrl = `https://${currentLocaleDomain}${basePath}`

  const canonicalUrl = getLocalizedUrl(currentLocaleDomain, basePath, asPath)

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
function getMessages(locale: string) {
  let langBundle
  switch (locale) {
    case 'en':
      langBundle = import('../compiled-lang/en.json')
      break
    case 'fr':
    default:
      langBundle = import('../compiled-lang/fr.json')
      break
  }

  return langBundle
}

function getLocalizedUrl(domain: string, basePath: string, path: string) {
  return `https://${domain}${basePath}${path}`
}

MyApp.getStaticProps = async ({
  locale: nextLocale,
  params: { locale: localeParam },
}: any) => {
  const locale = localeParam || nextLocale || process.env.DEFAULT_LOCALE
  const messagePromise = getMessages(locale)

  const [, messages] = await Promise.all([polyfill(locale), messagePromise])

  return {
    locale,
    messages: messages.default,
  }
}

export default MyApp
