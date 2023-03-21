import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import type React from 'react'

import Footer from './Footer'
import Header from './Header/Header'

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  const { basePath, asPath } = useRouter()
  const {
    publicRuntimeConfig: {
      seo: { person, siteUrl, socials },
    },
  } = getConfig()

  return (
    <>
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

      <div className="flex flex-col justify-center max-w-3xl mx-auto">
        <Header />

        <main className="w-full md:my-4 px-8">{children}</main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
