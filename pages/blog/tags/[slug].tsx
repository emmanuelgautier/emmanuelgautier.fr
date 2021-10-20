import { kebabCase, uniq } from 'lodash'
import { NextSeo } from 'next-seo'

import { allPosts } from '.contentlayer/data'
import type { Post } from '.contentlayer/types'

import SEO from '../../../next-seo.config.js'

import BlogPostCard from '../../../components/BlogPostCard'
import Layout from '../../../components/Layout'

interface Props {
  page: {
    posts: Post[]
    slug: string
  }
}

function BlogTag({ page }: Props) {
  const { posts, slug } = page
  const tag = slug
  const title = tag
  const description = `Articles about ${tag}`
  const url = `${SEO.siteUrl}/blog/tags/${slug}`

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
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>

        {posts.map(({ slug, title, description }) => (
          <BlogPostCard
            key={`tag-posts-${slug}`}
            title={title}
            slug={slug}
            summary={description}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogTag

export function getStaticProps({
  params: { slug },
  locale = process.env.DEFAULT_LOCALE,
}: any) {
  const posts: any[] = allPosts
    .filter(({ tags }) => tags.some((tag) => kebabCase(tag) === slug))
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))

  return {
    props: {
      page: {
        posts,
        slug,
      },
      locale,
    },
  }
}

export function getStaticPaths() {
  // const tags: Array<{ slug: string; tag: string }> = getAllTags(locale)
  const tags = allPosts
    .reduce((acc, { tags }) => acc.concat(tags), [])
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
