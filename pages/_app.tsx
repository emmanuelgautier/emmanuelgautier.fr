import '@fontsource/open-sans'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo.config'

import '../styles/globals.css'

type Props = AppProps

function MyApp({ Component, pageProps }: Props) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
