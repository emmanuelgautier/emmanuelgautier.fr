import Head from 'next/head'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import React from 'react'

import { GTM_ID } from '../lib/gtm'
import SEO from '../next-seo.config'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'

type Props = {
  title: string
  description: string
  path: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  const router = useRouter()
  const { basePath, asPath } = router
  const isAmp = useAmp()

  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {!isAmp && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GTM_ID}');`,
              }}
            />
          </>
        )}

        {!isAmp && (
          <link
            rel="amphtml"
            href={`/${basePath}${asPath === '/' ? 'index' : asPath}.amp/`}
          />
        )}
      </Head>

      <NextSeo title={title} description={description} />
      <SocialProfileJsonLd
        type="Person"
        name={SEO.person.name}
        url={`https://${SEO.siteUrl}`}
        sameAs={SEO.socials}
      />

      <main>{children}</main>
    </>
  )
}

export default Layout
