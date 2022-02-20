import { format, parseISO } from 'date-fns'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allSnippets } from '.contentlayer/generated'

import loadIntlMessages from '@lib/loadIntlMessages'

import Content from '@components/Content'
import Layout from '@components/Layout'
import OutboundLink from '@components/OutboundLink'
import Text from '@components/Text'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>
const discussUrl = (url: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`

function Snippet({ snippet }: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
        person,
        siteUrl,
      },
    },
  } = getConfig()
  const intl = useIntl()

  const { title, description, body, created, updated, slug } = snippet
  const url = `${siteUrl}/blog/snippets/${slug}`

  const languageAlternates = (domains as any[]).map(
    ({ defaultLocale, domain }) => ({
      hrefLang: defaultLocale,
      href: `https://${domain}/blog/snippets/${slug}`,
    })
  )

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        languageAlternates={languageAlternates}
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
            name: intl.formatMessage({ defaultMessage: 'Blog' }),
            item: `${siteUrl}/blog`,
          },
          {
            position: 3,
            name: intl.formatMessage({ defaultMessage: 'Snippets' }),
            item: `${siteUrl}/blog/snippets`,
          },
          {
            position: 4,
            name: title,
            item: url,
          },
        ]}
      />

      <div className="container w-full max-w-prose mx-auto mb-8">
        <article className="mx-auto max-w-3xl xl:max-w-5xl">
          <header className="pt-2">
            <div className="space-y-4 text-left">
              <Text variant="pageHeading">{title}</Text>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span>{`${person.name} / `}</span>
                    <span>{format(parseISO(created), 'MMMM dd, yyyy')}</span>
                  </p>
                </div>
              </div>

              <p className="prose dark:prose-dark text-lg md:text-xl">
                {description}
              </p>
            </div>
          </header>

          <div className="prose dark:prose-dark max-w-none w-full mt-8">
            <Content content={body} />
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 mt-8">
            <OutboundLink href={discussUrl(url)}>
              {intl.formatMessage({ defaultMessage: 'Discuss on Twitter' })}
            </OutboundLink>
          </div>
        </article>
      </div>
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
