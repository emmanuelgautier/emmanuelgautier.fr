import { NextSeo } from 'next-seo'

import { getAllTags, getPostsByTag } from '../../../lib/api'
import SEO from '../../../next-seo.config'

import BlogPostCard from '../../../components/BlogPostCard'
import Layout from '../../../components/Layout'

interface Props {
  page: {
    posts: Array<{ title: string; slug: string, description: string }>
    slug: string
  }
}

export const config = { amp: 'hybrid' }

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
          <BlogPostCard key={`tag-posts-${slug}`} title={title} slug={slug} summary={description} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogTag

export const getStaticProps = async ({
  params: { slug },
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const posts: any[] = getPostsByTag(slug, locale, [
    'title',
    'slug',
    'description',
    'created',
    'updated',
  ]).sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))

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

export async function getStaticPaths({
  locale = process.env.DEFAULT_LOCALE,
}: any) {
  const tags: Array<{ slug: string; tag: string }> = getAllTags(locale)

  return {
    paths: tags.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      }
    }),
    fallback: false,
  }
}
