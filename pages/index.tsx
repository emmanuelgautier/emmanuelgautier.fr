import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPages } from '.contentlayer/generated'

import Layout from '@components/Layout'
import Content from '@components/Content'
import NewsletterForm from '@components/NewsletterForm'
import loadIntlMessages from '@lib/load-intl-messages'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Home({
  page: { body, title, description },
}: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
      },
    },
  } = getConfig()
  const intl = useIntl()

  return (
    <Layout title={title} description={description}>
      <NextSeo
        languageAlternates={(domains as any[]).map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}`,
          })
        )}
      />

      <div className="mt-4">
        <Content content={body} />
      </div>

      <div className="mt-16">
        <NewsletterForm />
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps(ctx: any) {
  const page = allPages.find(({ slug }) => slug === 'index')!

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page,
    },
  }
}
