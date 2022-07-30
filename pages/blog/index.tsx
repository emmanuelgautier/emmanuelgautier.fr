import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPosts } from '.contentlayer/generated'

import BlogPostCard from '@components/BlogPostCard'
import Layout from '@components/Layout'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import FeaturedPosts from '@components/FeaturedPosts'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function BlogIndex({ page: { posts } }: PageProps): React.ReactNode {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
        siteUrl,
      },
    },
  } = getConfig()

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
          <Text variant="sectionHeading">
            {intl.formatMessage({ defaultMessage: 'Featured Posts' })}
          </Text>

          <FeaturedPosts />
        </section>

        <section>
          <Text variant="sectionHeading">All Posts</Text>

          {posts.map(({ slug, title, description }) => (
            <BlogPostCard
              key={`blog-posts-${slug}`}
              title={title}
              slug={slug}
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
  const posts = allPosts.sort((post1: any, post2: any) =>
    post1.created > post2.created ? -1 : 1
  )

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        posts,
      },
    },
  }
}
