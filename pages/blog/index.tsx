import { NextSeo } from 'next-seo'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'

import { getAllPosts } from '../../lib/api'
import SEO from '../../next-seo.config'

interface Props {
  page: {
    posts: Array<{ slug: string; title: string; description: string }>
  }
}

export const config = { amp: 'hybrid' }

function BlogIndex({ page }: Props) {
  const { posts } = page
  const title = 'Blog'
  const description = ''
  const url = `https://${SEO.siteUrl}/blog/`

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
            href: `https://${domain}/blog/`,
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

export const getStaticProps = async ({
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const posts: any[] = getAllPosts(locale, [
    'slug',
    'title',
    'description',
    'created',
  ])
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 20)

  return {
    props: {
      page: {
        posts,
      },
      locale,
    },
  }
}
