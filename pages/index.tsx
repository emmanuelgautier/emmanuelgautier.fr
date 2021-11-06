import { capitalize } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPages, allPosts } from '.contentlayer/data'

import Layout from '../components/Layout'
import ProfileImg from '../components/ProfileImg'

import loadIntlMessages from '../lib/loadIntlMessages'

import BlogPostCard from '../components/BlogPostCard'
import ProjectCard from '../components/ProjectCart'
import Content from '../components/Content'

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

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <div className="text-center mt-12 pb-4 border-b border-1 border-gray-200 dark:border-gray-800">
          <div className="h-40 w-40 mx-auto mb-4">
            <ProfileImg width={250} height={250} title={title} />
          </div>
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            {title}
          </h1>
          <div className="prose text-gray-600 dark:text-gray-400 mb-16 text-base sm:text-lg md:text-xl mt-3">
            <Content content={body} />
          </div>
        </div>

        {Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
              {capitalize(intl.formatMessage({ defaultMessage: 'Blog' }))}
            </h3>
            {featuredPosts.map(({ slug, title, description }) => (
              <BlogPostCard
                key={`homepage-featuredpost-${slug}`}
                slug={slug}
                title={title}
                summary={description}
              />
            ))}
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
            {capitalize(intl.formatMessage({ defaultMessage: 'Projects' }))}
          </h3>

          <Link href="https://www.data-show.com/">
            <a target="_blank">Data Show</a>
          </Link>

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
