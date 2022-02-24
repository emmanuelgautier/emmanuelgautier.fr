import { format, parseISO } from 'date-fns'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allNewsletters } from '.contentlayer/generated'

import Content from '@components/Content'
import Layout from '@components/Layout'
import Text from '@components/Text'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function NewsletterPage({ page }: PageProps): React.ReactElement {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: {
        siteUrl,
        i18n: { domains },
        person,
      },
    },
  } = getConfig()

  const {
    title,
    description,
    image,
    body,
    created,
    updated,
    slug,
    readingTime,
  } = page
  const url = `${siteUrl}/newsletter/${slug}`

  let images: string[] = []
  if (image) {
    images = [`${siteUrl}${image}`]
  }

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          article: {
            publishedTime: created,
            modifiedTime: updated,
          },
          images: images.map((_image) => ({
            url: _image,
            secureUrl: _image,
            alt: title,
          })),
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={images}
        datePublished={created}
        dateModified={updated}
        authorName={[person.name]}
        publisherName={person.name}
        publisherLogo={person.image}
        description={description}
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
            name: intl.formatMessage({ defaultMessage: 'Newsletter' }),
            item: `${siteUrl}/newsletter`,
          },
          {
            position: 3,
            name: title,
            item: url,
          },
        ]}
      />

      <article>
        <header className="pt-2">
          <div className="space-y-4 text-left">
            <Text variant="pageHeading">{title}</Text>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <p>
                  <span>{`${person.name} / `}</span>
                  <span>{format(parseISO(created), 'MMMM dd, yyyy')}</span>
                </p>
              </div>
              <p className="min-w-32">{readingTime.text}</p>
            </div>
          </div>
        </header>

        <div className="prose dark:prose-dark max-w-none w-full mt-8">
          <Text variant="body">
            <Content content={body} />
          </Text>
        </div>
      </article>
    </Layout>
  )
}

export default NewsletterPage

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const newsletter = allNewsletters.find(({ slug: _slug }) => _slug === slug)
  if (!newsletter) {
    throw new Error(`No newsletter found for slug ${slug}`)
  }

  return { props: { page: newsletter } }
}

export async function getStaticPaths() {
  return {
    paths: allNewsletters.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
