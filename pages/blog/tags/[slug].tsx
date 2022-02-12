import { kebabCase, uniq } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { allPosts } from '.contentlayer/data'

import loadIntlMessages from '@lib/loadIntlMessages'

import BlogPostCard from '@components/BlogPostCard'
import Layout from '@components/Layout'
import Text from '@components/Text'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function BlogTag({ page }: PageProps) {
  const {
    publicRuntimeConfig: {
      seo: { siteUrl },
    },
  } = getConfig()

  const { posts, slug } = page
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

        {posts.map(({ slug, title, description }) => (
          <BlogPostCard
            key={`tag-posts-${slug}`}
            title={title}
            slug={slug}
            description={description}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogTag

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const posts: any[] = allPosts
    .filter(({ tags }) => tags.some((tag) => kebabCase(tag) === slug))
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        posts,
        slug,
      },
    },
  }
}

export function getStaticPaths() {
  // const tags: Array<{ slug: string; tag: string }> = getAllTags(locale)
  const tags = allPosts
    .reduce<string[]>((acc, { tags }) => acc.concat(tags), [])
    .filter((tag) => tag)
  const uniqTags = uniq(tags)

  return {
    paths: uniqTags.map((tag) => ({
      params: {
        slug: kebabCase(tag),
      },
    })),
    fallback: false,
  }
}
