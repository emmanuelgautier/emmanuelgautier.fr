import Head from 'next/head'
import type React from 'react'

interface Props {
  name: string
  version: string
}

const AmpIncludeCustomElement: React.FC<Props> = ({ name, version }) => (
  <Head>
    <script
      async
      custom-element={name}
      src={`https://cdn.ampproject.org/v0/${name}-${version}.js`}
      key={name}
    />
  </Head>
)

export default AmpIncludeCustomElement
