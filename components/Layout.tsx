import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { GTM_ID } from '../lib/gtm'
import SEO from '../next-seo.config'

import ProfileImg from './ProfileImg'

type Props = {
  title: string
  description: string
  children: React.ReactNode
  headEnabled?: boolean
}

const Layout: React.FC<Props> = ({
  title,
  description,
  children,
  headEnabled = true,
}) => {
  const router = useRouter()
  const { basePath, asPath } = router
  const isAmp = useAmp()

  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {!isAmp ? (
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
        ) : (
            <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
          )}

        {!isAmp && (
          <link
            rel="amphtml"
            href={`${basePath}${asPath === '/' ? '/index' : asPath}.amp/`}
          />
        )}
      </Head>

      {isAmp && (
        <amp-analytics type="gtag" data-credentials="include">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: `{ "vars" : { "gtag_id": "${GTM_ID}", "config" : { "${GTM_ID}": {"groups": "default" } } } }`,
            }}
          />
        </amp-analytics>
      )}

      <NextSeo title={title} description={description} />
      <SocialProfileJsonLd
        type="Person"
        name={SEO.person.name}
        url={SEO.siteUrl}
        sameAs={SEO.socials}
      />

      {headEnabled && (
        <header className="w-full mx-auto my-4 mb-12">
          <div className="flex flex-wrap justify-center">
            <Link href={`/`}>
              <a className="inline-flex">
                <ProfileImg
                  className="h-16 w-16 mx-2"
                  title={SEO.person.name}
                />
                <span className="text-gray-700 leading-12 md:leading-14 text-xl md:text-2xl mx-2 my-4">
                  {SEO.person.name}
                </span>
              </a>
            </Link>
          </div>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}

export default Layout
