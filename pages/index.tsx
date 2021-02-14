import { capitalize } from 'lodash'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { getFeaturedPosts, getPageBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

import Layout from '../components/Layout'
import ProfileImg from '../components/ProfileImg'

interface Props {
  page: {
    title: string
    description: string
    content: string
    featuredPosts: Array<{ slug: string; title: string }>
  }
}

const featuredPostNumber = 3

export const config = { amp: 'hybrid' }

function Home({ page: { content, featuredPosts, title, description } }: Props) {
  const intl = useIntl()

  return (
    <Layout title={title} description={description} headEnabled={false}>
      <div className="container w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center items-center text-center mt-12 md:mt-20 pb-12 mx-40 border-b border-gray-300">
          <div className="h-40 w-40 m-5">
            <ProfileImg title={title} />
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div
            className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div className="flex flex-col my-8">
          <h3 className="text-lg tracking-tight md:text-3xl">
            {capitalize(intl.formatMessage({ defaultMessage: 'blog' }))}
          </h3>

          <div className="py-6 px-2 prose">
            <ul>
              {featuredPosts.map(({ slug, title }) => (
                <li key={slug}>
                  <Link href={`/blog/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col my-8">
          <h3 className="text-lg tracking-tight md:text-3xl">
            {capitalize(intl.formatMessage({ defaultMessage: 'projects' }))}
          </h3>

          <div className="py-6 px-2 prose">
            <ul>
              <li>
                <Link href="https://www.data-show.com/">
                  <a target="_blank">Data Show</a>
                </Link>
              </li>

              <li>
                <Link href="https://www.planete-durable.fr/">
                  <a target="_blank">Planète Durable</a>
                </Link>
              </li>
            </ul>
          </div>
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
    getFeaturedPosts(lang, ['created', 'slug', 'title'])
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
