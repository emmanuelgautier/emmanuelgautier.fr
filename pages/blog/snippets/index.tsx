import { InferGetStaticPropsType } from 'next'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import getConfig from 'next/config'
import { useIntl } from 'react-intl'
import { allSnippets } from '.contentlayer/generated'

import SnippetCard from '@components/SnippetCard'
import Layout from '@components/Layout'
import Text from '@components/Text'
import { getEnDomain } from '@lib/get-localized-domain'
import loadIntlMessages from '@lib/load-intl-messages'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function SnippetsIndex({ page }: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: { siteUrl },
    },
  } = getConfig()
  const intl = useIntl()

  const { snippets } = page
  const title = 'Snippets'
  const description = ''
  const url = `${siteUrl}/blog/snippets`

  const canonicalDomain = getEnDomain()
  const canonicalUrl = `https://${canonicalDomain}/blog/snippets`

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          title,
          description,
          url,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: intl.formatMessage({ defaultMessage: 'Home' }),
            item: `${siteUrl}`,
          },
          {
            position: 2,
            name: intl.formatMessage({ id: 'snippets' }),
            item: url,
          },
        ]}
      />

      <div className="flex flex-col justify-center items-start mb-16">
        <Text variant="pageHeading">{title}</Text>

        {snippets.map(({ slug, title, description, image }) => (
          <SnippetCard
            key={`snippets-${slug}`}
            className="w-full"
            title={title}
            slug={slug}
            description={description}
            icon={image}
          />
        ))}
      </div>
    </Layout>
  )
}

export default SnippetsIndex

export async function getStaticProps(ctx: any) {
  const snippets = allSnippets
    .sort((snippet1: any, snippet2: any) =>
      snippet1.created > snippet2.created ? -1 : 1
    )
    .slice(0, 30)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        snippets,
      },
    },
  }
}
