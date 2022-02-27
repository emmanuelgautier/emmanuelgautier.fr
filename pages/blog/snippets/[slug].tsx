import { InferGetStaticPropsType } from 'next'
import Img from 'next/image'
import getConfig from 'next/config'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allSnippets } from '.contentlayer/generated'

import Content from '@components/Content'
import Layout from '@components/Layout'
import NewsletterForm from '@components/NewsletterForm'
import Text from '@components/Text'
import { getEnDomain } from '@lib/get-localized-domain'
import loadIntlMessages from '@lib/load-intl-messages'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Snippet({ snippet }: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: { siteUrl },
    },
  } = getConfig()
  const intl = useIntl()

  const { title, description, image, body, slug } = snippet

  const url = `${siteUrl}/blog/snippets/${slug}`

  const canonicalDomain = getEnDomain()
  const canonicalUrl = `https://${canonicalDomain}/blog/snippets/${slug}`

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
            name: intl.formatMessage({ defaultMessage: 'Snippets' }),
            item: `${siteUrl}/blog/snippets`,
          },
          {
            position: 3,
            name: title,
            item: url,
          },
        ]}
      />

      <article className="pt-2">
        <header className="flex justify-between w-full mb-8">
          <div className="space-y-4 text-left">
            <Text variant="pageHeading">{title}</Text>
          </div>

          <div className="mt-2 sm:mt-0">
            <Img
              src={image}
              alt={title}
              title={title}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        </header>

        <div className="prose dark:prose-dark max-w-none w-full mt-8">
          <Content content={body} />
        </div>

        <div className="mt-16">
          <NewsletterForm />
        </div>
      </article>
    </Layout>
  )
}

export default Snippet

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const snippet = allSnippets.find(({ slug: _slug }) => _slug === slug)
  if (!snippet) {
    throw new Error()
  }

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      snippet,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: allSnippets.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
