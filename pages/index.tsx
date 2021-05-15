import { capitalize } from 'lodash'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'

import { getFeaturedPosts, getPageBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

import Layout from '../components/Layout'
import ProfileImg from '../components/ProfileImg'

import SEO from '../next-seo.config'
import BlogPostCard from '../components/BlogPostCard'
import ProjectCard from '../components/ProjectCart'

interface Props {
  page: {
    title: string
    description: string
    content: string
    featuredPosts: Array<{ slug: string; title: string; description: string }>
  }
}

const featuredPostNumber = 3

export const config = { amp: 'hybrid' }

function Home({ page: { content, featuredPosts, title, description } }: Props) {
  const intl = useIntl()

  return (
    <Layout title={title} description={description}>
      <NextSeo
        languageAlternates={SEO.i18n.domains.map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}/`,
          })
        )}
      />

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <div className="text-center mt-12 pb-4 border-b border-1 border-gray-200 dark:border-gray-800">
          <div className="h-40 w-40 mx-auto mb-4">
            <ProfileImg title={title} />
          </div>
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            {title}
          </h1>
          <h2
            className="prose text-gray-600 dark:text-gray-400 mb-16 text-base sm:text-lg md:text-xl mt-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

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

export const getStaticProps = async ({
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const page: any = getPageBySlug('home', locale, [
    'title',
    'description',
    'content',
  ])
  const content = await markdownToHtml(page.content || '')

  const getStaticFeaturedPosts = (lang: string, sliceEnd: number) =>
    getFeaturedPosts(lang, ['created', 'slug', 'title', 'description'])
      .sort((post1: any, post2: any) =>
        post1.created > post2.created ? -1 : 1
      )
      .slice(0, sliceEnd)

  let featuredPosts = getStaticFeaturedPosts(locale, featuredPostNumber)
  if (featuredPosts.length < featuredPostNumber) {
    featuredPosts = featuredPosts.concat(
      getStaticFeaturedPosts('fr', featuredPostNumber - featuredPosts.length)
    )
  }

  return {
    props: {
      page: {
        ...page,
        featuredPosts,
        content,
      },
    },
  }
}
