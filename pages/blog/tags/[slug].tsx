import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { getAllTags, getPostsByTag } from '../../../lib/api'
import { blog as blogSEOConfig } from '../../../next-seo.config'

import Layout from '../../../components/Layout'

interface Props {
  page: {
    posts: Array<{ title: string; slug: string }>
    slug: string
  }
}

export const config = { amp: 'hybrid' }

function BlogTag({ page }: Props) {
  const { posts, slug } = page
  const tag = slug
  const title = tag
  const description = `Articles about ${tag}`
  const url = `https://${blogSEOConfig.subdomain}${blogSEOConfig.pathPrefix}/tags/${slug}`
  const canonical = blogSEOConfig.subdomain === 'blog.emmanuelgautier.fr' ? `https://${blogSEOConfig.subdomain}/tags/${slug}` : `https://${blogSEOConfig.subdomain}${blogSEOConfig.pathPrefix}/tags/${slug}`

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url,
        }}
      />

      <div className="container w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center items-center text-center mt-12 md:mt-20 pb-12 mx-40 border-b border-gray-300">
          <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            {title}
          </h1>
        </div>

        <div className="py-6 px-2 prose">
          <ul>
            {posts.map(({ slug, title }) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
