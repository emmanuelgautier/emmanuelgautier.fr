import { InferGetStaticPropsType } from 'next'
import Img from 'next/image'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'

import { Comments } from '@components/Comments'
import { ConsultingCTA } from '@components/ConsultingCTA'
import Content from '@components/Content'
import Layout from '@components/Layout'
import ShareButtons from '@components/ShareButtons'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import { getAllSnippets, getAllTagsForContent } from '@lib/content'
import CarbonAds from '@components/CarbonAds'
import { getLocale } from '@lib/get-localized-domain.mjs'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Snippet({ snippet, tags }: PageProps): React.ReactNode {
  const intl = useIntl()
  const { locale = getLocale() } = useRouter()
  const {
    publicRuntimeConfig: {
      seo: {
        siteUrl,
        i18n: { domains },
      },
    },
  } = getConfig()

  const { title, description, image, body, slug, alternate } = snippet

  const url = `${siteUrl}/blog/snippets/${slug}`

  const languageAlternates = [
    {
      hrefLang: locale,
      href: url,
    },
  ]
  if (alternate) {
    const [alternateLang, alternateSlug] = Object.entries(alternate)[0]
    const alternateSubdomain = (domains as any[]).find(
      ({ defaultLocale }) => alternateLang === defaultLocale
    )?.domain

    languageAlternates.push({
      hrefLang: alternateLang,
      href: `https://${alternateSubdomain}/blog/snippets/${alternateSlug}`,
    })
  }

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        languageAlternates={languageAlternates}
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

      <article className="px-4 md:px-8">
        <header className="my-4 flex flex-col lg:grid lg:grid-cols-8 lg:gap-4 max-w-8xl mx-auto">
          <div className="col-start-3 col-span-4">
            <Text variant="pageHeading">{title}</Text>
          </div>

          <div className="col-span-2">
            <CarbonAds />
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-4 justify-center max-w-8xl mx-auto">
          <div className="flex flex-col col-start-3 col-span-4">
            <div className="prose dark:prose-dark max-w-none w-full mb-8">
              <Text variant="body">
                <Content content={body} />
              </Text>
            </div>

            <ConsultingCTA />

            <ShareButtons
              url={url}
              title={title}
              description={description}
              tags={tags.map(({ hashtag }) => hashtag)}
            />

            <Comments url={url} title={title} />
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default Snippet

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const snippet = getAllSnippets(getLocale()).find(
    ({ slug: _slug }) => _slug === slug
  )
  if (!snippet) {
    throw new Error()
  }

  const tags = getAllTagsForContent(snippet).map(({ hashtag, name, slug }) => ({
    hashtag,
    name,
    slug,
  }))

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
    paths: getAllSnippets(getLocale()).map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}
