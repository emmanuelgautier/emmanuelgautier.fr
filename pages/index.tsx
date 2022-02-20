import { capitalize } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPages, allPosts } from '.contentlayer/generated'

import loadIntlMessages from '@lib/loadIntlMessages'

import Layout from '@components/Layout'
import ProfileImg from '@components/ProfileImg'
import BlogPostCard from '@components/BlogPostCard'
import ProjectCard from '@components/ProjectCard'
import Content from '@components/Content'
import Text from '@components/Text'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Home({
  page: { body, title, description },
  featuredPosts,
}: PageProps): React.ReactNode {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
      },
    },
  } = getConfig()
  const intl = useIntl()

  return (
    <Layout title={title} description={description}>
      <NextSeo
        languageAlternates={(domains as any[]).map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}`,
          })
        )}
      />

      <div className="flex flex-col-reverse sm:flex-row items-start border-b border-1 border-gray-200 dark:border-gray-800 pb-8 mt-4">
        <div className="flex flex-col pr-4">
          <Text variant="heading">{title}</Text>
          <div className="prose dark:prose-dark text-base sm:text-lg md:text-xl">
            <Content content={body} />
          </div>
        </div>
        <div className="h-40 w-40 mx-auto">
          <ProfileImg width={250} height={250} title={title} />
        </div>
      </div>

      {Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
        <div className="border-b border-1 border-gray-200 dark:border-gray-800 pb-8 mt-8">
          <Text variant="sectionHeading">
            {capitalize(intl.formatMessage({ defaultMessage: 'Blog' }))}
          </Text>

          {featuredPosts.map(({ slug, title, description }) => (
            <BlogPostCard
              key={`homepage-featuredpost-${slug}`}
              slug={slug}
              title={title}
              description={description}
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Text variant="sectionHeading">
          {capitalize(intl.formatMessage({ defaultMessage: 'Projects' }))}
        </Text>

        <ProjectCard
          title="Data Show"
          href="https://www.data-show.com/"
          description="Data Show makes data visualization notebooks with open data about economics and health topics."
        />

        <ProjectCard
          title="Planète Durable"
          href="https://www.planete-durable.fr/"
          description="Chaque geste compte. Planète Durable partage des conseils, innovations et initiatives veillant à préserver notre planète."
        />
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps(ctx: any) {
  const page = allPages.find(({ slug }) => slug === 'index')!

  const featuredPosts = allPosts
    .filter(({ featured }) => featured)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 5)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page,
      featuredPosts,
    },
  }
}
