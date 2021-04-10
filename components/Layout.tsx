import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { GTM_ID } from '../lib/gtm'
import SEO from '../next-seo.config'

import Footer from './Footer'

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  description,
  children,
}) => {
  const intl = useIntl()
  const router = useRouter()
  const { basePath, asPath } = router
  const isAmp = useAmp()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

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
            href={`${basePath}${asPath === '/' ? '/index' : asPath.substr(0, asPath.length - 1)}.amp/`}
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

      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
            </svg>
          )}
        </button>
        <div>
          <Link href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </Link>

          <Link href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              {intl.formatMessage({ defaultMessage: 'Home' })}
            </a>
          </Link>
        </div>
      </nav>

      <main className="flex flex-col justify-center bg-white dark:bg-black px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
