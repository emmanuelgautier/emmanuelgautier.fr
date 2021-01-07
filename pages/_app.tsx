import 'fontsource-open-sans'
import { AppProps } from 'next/app'

import '../styles/globals.css'

type Props = AppProps

function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}

export default MyApp
