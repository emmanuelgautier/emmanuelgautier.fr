import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { getAllPosts } from '../../lib/api'
import { blog as blogSEOConfig } from '../../next-seo.config'

import Layout from '../../components/Layout'

interface Props {
  page: {
    posts: Array<{ slug: string; title: string }>
  }
}

export const config = { amp: 'hybrid' }

function BlogIndex({ page }: Props) {
  const { posts } = page
  const title = 'Blog'
  const description = ''
  const url = `https://${blogSEOConfig.subdomain}/`
  const canonical = blogSEOConfig.subdomain === 'blog.emmanuelgautier.fr' ? `https://${blogSEOConfig.subdomain}/` : `https://${blogSEOConfig.subdomain}${blogSEOConfig.pathPrefix}/`

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
                <Link href={`${blogSEOConfig.pathPrefix}/${slug}`}>
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

export default BlogIndex

export const getStaticProps = async ({
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const posts: any[] = getAllPosts(locale, ['slug', 'title', 'created'])
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 10)

  return {
    props: {
      page: {
        posts,
      },
      locale,
    },
  }
}
