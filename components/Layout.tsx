import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import type React from 'react'

import Footer from './Footer'
import Header from './Header/Header'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children, ...props }) => {
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

      <Header />

      <main {...props}>{children}</main>

      <Footer />
    </>
  )
}

export default Layout
