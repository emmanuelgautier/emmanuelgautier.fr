import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { allPosts } from '.contentlayer/generated'

import loadIntlMessages from '@lib/loadIntlMessages'

import BlogPostCard from '@components/BlogPostCard'
import Layout from '@components/Layout'
import Text from '@components/Text'

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

  const { posts } = page
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

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <Text variant="pageHeading">{title}</Text>

        {posts.map(({ slug, title, description }) => (
          <BlogPostCard
            key={`blog-posts-${slug}`}
            title={title}
            slug={slug}
            description={description}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex

export async function getStaticProps(ctx: any) {
  const posts = allPosts
    .sort((post1: any, post2: any) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 30)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        posts,
      },
    },
  }
}
