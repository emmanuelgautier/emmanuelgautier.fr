import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import type React from 'react'

import { GTM_ID } from '../lib/gtm'

import Footer from './Footer'
import Header from './Header'

const cloudflareInsightsToken = process.env.CLOUDFLARE_INSIGHTS_TOKEN

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  const router = useRouter()
  const { basePath, asPath } = router
  const {
    publicRuntimeConfig: {
      seo: { person, siteUrl, socials },
    },
  } = getConfig()

  return (
    <>
      {GTM_ID && (
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

      <NextSeo
        title={title}
        description={description}
        canonical={`${siteUrl}${basePath}${asPath}`}
      />

      <SocialProfileJsonLd
        type="Person"
        name={person.name}
        url={`${siteUrl}/`}
        sameAs={Object.values(socials)}
      />

      <Header />

      <main className="flex flex-col justify-center bg-white dark:bg-black px-8">
        {children}
      </main>
      <Footer />

      {cloudflareInsightsToken && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cloudflareInsightsToken}"}`}
        ></script>
      )}
    </>
  )
}

export default Layout
