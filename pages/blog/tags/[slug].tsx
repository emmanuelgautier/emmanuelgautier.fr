import { capitalize } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'

import BlogPostCard from '@components/BlogPostCard'
import Layout from '@components/Layout'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import { getAllTags, getTagBySlug } from '@lib/content'
import SnippetCard from '@components/SnippetCard'
import { getLocale } from '@lib/get-localized-domain.mjs'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function BlogTag({ page }: PageProps) {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: { siteUrl },
    },
  } = getConfig()

  const { posts, snippets, slug } = page
  const tag = slug
  const title = tag
  const description = `Articles about ${tag}`
  const url = `${siteUrl}/blog/tags/${slug}`

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
        }}
      />

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <Text variant="pageHeading">{title}</Text>

        {posts.length > 0 && (
          <section>
            <Text variant="sectionHeading">
              {capitalize(intl.formatMessage({ id: 'posts' }))}
            </Text>

            {posts.map(({ slug, title, description, url }) => (
              <BlogPostCard
                key={`tag-posts-${slug}`}
                title={title}
                url={url}
                description={description}
              />
            ))}
          </section>
        )}

        {snippets.length > 0 && (
          <section>
            <Text variant="sectionHeading">
              {capitalize(intl.formatMessage({ id: 'snippets' }))}
            </Text>

            {snippets.map(({ url, slug, title, description, image }) => (
              <SnippetCard
                key={`tag-snippets-${slug}`}
                title={title}
                url={url}
                description={description}
                icon={image}
              />
            ))}
          </section>
        )}
      </div>
    </Layout>
  )
}

export default BlogTag

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const tag = getTagBySlug(slug, getLocale())
  if (!tag) {
    throw new Error(`Tag not found: ${slug}`)
  }

  const posts = tag.posts.sort((post1: any, post2: any) =>
    post1.created > post2.created ? -1 : 1
  )
  const snippets = tag.snippets.sort((snippet1: any, snippet2: any) =>
    snippet1.created > snippet2.created ? -1 : 1
  )

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        slug,
        posts,
        snippets,
      },
    },
  }
}

export function getStaticPaths() {
  const tags = getAllTags(getLocale())

  return {
    paths: tags.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}
