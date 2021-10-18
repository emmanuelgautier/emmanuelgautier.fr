import { NextSeo } from 'next-seo'

import { allPosts } from '.contentlayer/data'
import type { Post } from '.contentlayer/types'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'

import SEO from '../../next-seo.config.js'

interface Props {
  page: {
    posts: Post[]
  }
}

export const config = { amp: 'hybrid' }

function BlogIndex({ page }: Props): React.ReactNode {
  const { posts } = page
  const title = 'Blog'
  const description = ''
  const url = `https://${SEO.siteUrl}/blog`

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
        languageAlternates={SEO.i18n.domains.map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}/blog`,
          })
        )}
      />

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>

        {posts.map(({ slug, title, description }) => (
          <BlogPostCard
            key={`blog-posts-${slug}`}
            title={title}
            slug={slug}
            summary={description}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const getStaticProps = ({
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const posts = allPosts
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 30)

  return {
    props: {
      page: {
        posts,
      },
      locale,
    },
  }
}
