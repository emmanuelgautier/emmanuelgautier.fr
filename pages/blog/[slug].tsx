import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format, parseISO } from 'date-fns'
import { kebabCase } from 'lodash'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { useAmp } from 'next/amp'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { LinkedinShareButton, TwitterShareButton } from 'react-share'

import Layout from '../../components/Layout'
import OutboundLink from '../../components/OutboundLink'

import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import SEO from '../../next-seo.config'

interface Props {
  page: {
    alternate?: {
      en?: string,
      fr?: string
    },
    title: string
    description: string
    image: string
    tags: string[]
    slug: string
    updated: string
    created: string
    content: string
  },
  locale: string
}

const discussUrl = (url: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`;

export const config = { amp: 'hybrid' }

function BlogPost({ locale, page }: Props) {
  const isAmp = useAmp()
  const intl = useIntl()

  const siteUrl = SEO.siteUrl
  const {
    alternate,
    title,
    description,
    image,
    tags,
    content,
    created,
    updated,
    slug,
  } = page
  const url = `${siteUrl}/blog/${slug}`
  const hashtags = tags.map((tag) => `${tag.split(' ').join('')}`)

  const languageAlternates = [
    {
      hrefLang: locale,
      href: url
    }
  ]
  if (alternate) {
    const [alternateLang, alternateSlug] = Object.entries(alternate)[0]
    const alternateSubdomain = SEO.i18n.domains.find(({ defaultLocale }) => alternateLang === defaultLocale)?.domain

    languageAlternates.push({
      hrefLang: alternateLang,
      href: `https://${alternateSubdomain}/blog/${alternateSlug}`
    })
  }

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        languageAlternates={languageAlternates}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          article: {
            publishedTime: created,
            modifiedTime: updated,
            tags,
          },
          images: [
            {
              url: `${siteUrl}${image}`,
              alt: title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={[`${siteUrl}${image}`]}
        datePublished={created}
        dateModified={updated}
        authorName={[SEO.person.name]}
        publisherName={SEO.person.name}
        publisherLogo={`${siteUrl}${SEO.person.image}`}
        description={description}
      />

      <div className="container w-full max-w-prose mx-auto mb-8">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
          <header className="pt-2">
            <div className="space-y-4 text-left">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                {title}
              </h1>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span>{`${SEO.person.name} / `}</span>
                    <span>{format(parseISO(created), 'MMMM dd, yyyy')}</span>
                  </p>
                </div>

                {!isAmp && (
                  <div className="justify-self-end text-sm">
                    <TwitterShareButton
                      url={url}
                      title={title}
                      via={SEO.twitter.site}
                      hashtags={hashtags}
                      resetButtonStyle={false}
                      related={[SEO.twitter.site]}
                      className="cursor-pointer h-6 w-6 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 mr-1 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={url}
                      summary={description}
                      source={SEO.person.name}
                      resetButtonStyle={false}
                      className="cursor-pointer h-6 w-6 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 mr-1 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </LinkedinShareButton>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div
            className="prose dark:prose-dark max-w-none w-full mt-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="text-sm text-gray-700 dark:text-gray-300 mt-8">
            <OutboundLink href={discussUrl(url)}>
              {intl.formatMessage({ defaultMessage: 'Discuss on Twitter' })}
            </OutboundLink>
          </div>

          {tags && tags.length ? (
            <div className="mt-8">
              {tags.map((tag) => (
                <Link
                  key={`${tag}-tag`}
                  href={`/blog/tags/${kebabCase(tag)}/`}
                >
                  <a className="inline-block text-gray-300 dark:text-gray-700 bg-gray-700 dark:bg-gray-300 rounded px-4 py-1 text-xs mr-2">
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </Layout>
  )
}

export default BlogPost

export const getStaticProps = async ({
  params: { slug },
  locale = process.env.DEFAULT_LOCALE,
}: any) => {
  const post: any = getPostBySlug(slug, locale, [
    'title',
    'description',
    'image',
    'alternate',
    'tags',
    'slug',
    'created',
    'updated',
    'date',
    'content',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      page: {
        ...post,
        content,
      },
      locale,
    },
  }
}

export async function getStaticPaths({
  locale = process.env.DEFAULT_LOCALE,
}: any) {
  const posts: any[] = getAllPosts(locale, ['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
