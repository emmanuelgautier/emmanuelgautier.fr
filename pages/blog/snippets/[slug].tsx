import { InferGetStaticPropsType } from 'next'
import Img from 'next/image'
import getConfig from 'next/config'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allSnippets } from '.contentlayer/generated'

import Content from '@components/Content'
import Layout from '@components/Layout'
import Tags from '@components/Tags'
import NewsletterForm from '@components/NewsletterForm'
import Text from '@components/Text'
import { getEnDomain } from '@lib/get-localized-domain'
import loadIntlMessages from '@lib/load-intl-messages'
import { getAllTagsForContent } from '@lib/content'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Snippet({ snippet, tags }: PageProps): React.ReactNode {
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
            name: intl.formatMessage({ id: 'snippets' }),
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

        {Array.isArray(tags) && tags.length > 0 && (
          <div className="mt-8">
            <Tags tags={tags} />
          </div>
        )}
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

  const tags = getAllTagsForContent(snippet)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      snippet,
      tags,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: allSnippets.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
