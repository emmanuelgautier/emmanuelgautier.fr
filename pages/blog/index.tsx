import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'

import BlogPostCard from '@components/BlogPostCard'
import Layout from '@components/Layout'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import { getAllPosts } from '@lib/content'
import { getLocale } from '@lib/get-localized-domain.mjs'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function BlogIndex({ page }: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
        siteUrl,
      },
    },
  } = getConfig()

  const { posts, featuredPosts } = page
  const title = 'Blog'
  const description = ''
  const url = `${siteUrl}/blog`

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
        languageAlternates={(domains as any[]).map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}/blog`,
          })
        )}
      />

      <div className="flex flex-col justify-center items-start mb-16">
        <Text variant="pageHeading">{title}</Text>

        <section>
          <Text variant="sectionHeading">Featured Posts</Text>

          {featuredPosts.map(({ slug, title, description, url }) => (
            <BlogPostCard
              key={`blog-posts-${slug}`}
              title={title}
              url={url}
              description={description}
            />
          ))}
        </section>

        <section>
          <Text variant="sectionHeading">All Posts</Text>

          {posts.map(({ url, title, description, slug }) => (
            <BlogPostCard
              key={`blog-posts-${slug}`}
              title={title}
              url={url}
              description={description}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default BlogIndex

export async function getStaticProps(ctx: any) {
  const posts = getAllPosts(getLocale(), true)
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))
    .map(({ title, description, featured = false, slug, url }) => ({
      title,
      description,
      featured,
      slug,
      url,
    }))

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        posts,
        featuredPosts: posts.filter(({ featured }) => featured).slice(0, 10),
      },
    },
  }
}
