import { format, parseISO } from 'date-fns'
import { kebabCase } from 'lodash'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  NextSeo,
} from 'next-seo'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'
import OutboundLink from '../../components/OutboundLink'

import {
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  getStaticFeaturedPosts,
} from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import SEO from '../../next-seo.config'

interface Post {
  description: string
  slug: string
  title: string
}

interface Props {
  page: {
    alternate?: {
      en?: string
      fr?: string
    }
    title: string
    description: string
    image: string
    tags: string[]
    slug: string
    updated: string
    created: string
    content: string
    relatedPosts: Array<Post>
    featuredPosts: Array<Post>
    questions?: Array<{
      question: string
      answer: string
    }>
  }
  locale: string
}

const discussUrl = (url: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`

export const config = { amp: 'hybrid' }

function BlogPost({ locale, page }: Props) {
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
    relatedPosts,
    featuredPosts,
    questions,
  } = page
  const url = `${siteUrl}/blog/${slug}`

  const languageAlternates = [
    {
      hrefLang: locale,
      href: url,
    },
  ]
  if (alternate) {
    const [alternateLang, alternateSlug] = Object.entries(alternate)[0]
    const alternateSubdomain = SEO.i18n.domains.find(
      ({ defaultLocale }) => alternateLang === defaultLocale
    )?.domain

    languageAlternates.push({
      hrefLang: alternateLang,
      href: `https://${alternateSubdomain}/blog/${alternateSlug}`,
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
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: intl.formatMessage({ defaultMessage: 'Home' }),
            item: `${siteUrl}/`,
          },
          {
            position: 2,
            name: intl.formatMessage({ defaultMessage: 'Blog' }),
            item: `${siteUrl}/blog/`,
          },
          {
            position: 3,
            name: title,
            item: url,
          },
        ]}
      />

      {questions && questions?.length > 0 && (
        <FAQPageJsonLd
          mainEntity={questions.map(({ question, answer }) => ({
            questionName: question,
            acceptedAnswerText: answer,
          }))}
        />
      )}

      <div className="container w-full max-w-prose mx-auto mb-8">
        <article className="mx-auto max-w-2xl xl:max-w-4xl">
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

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt-8">
              {tags.map((tag) => (
                <Link key={`${tag}-tag`} href={`/blog/tags/${kebabCase(tag)}/`}>
                  <a className="inline-block text-gray-100 dark:text-gray-700 bg-gray-700 dark:bg-gray-300 rounded px-4 py-2 text-xs mr-2 mb-2">
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          )}

          {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-xl md:text-2xl tracking-tight mb-4 text-black dark:text-white">
                {intl.formatMessage({ defaultMessage: 'Related Posts' })}
              </h3>
              {relatedPosts.map(({ description, slug, title }) => (
                <BlogPostCard
                  key={`post-related-posts-${slug}`}
                  slug={slug}
                  title={title}
                  summary={description}
                />
              ))}
            </div>
          )}

          {Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-xl md:text-2xl tracking-tight mb-4 text-black dark:text-white">
                {intl.formatMessage({ defaultMessage: 'Featured Posts' })}
              </h3>
              {featuredPosts.map(({ description, slug, title }) => (
                <BlogPostCard
                  key={`post-featured-posts-${slug}`}
                  slug={slug}
                  title={title}
                  summary={description}
                />
              ))}
            </div>
          )}
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
    'questions',
  ])
  const content = await markdownToHtml(post.content || '')

  let relatedPosts: any[] = []
  if (post.tags.length > 0) {
    relatedPosts = (
      getPostsByTag(post.tags[0], locale, [
        'title',
        'slug',
        'description',
        'created',
      ]) as any[]
    )
      .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
      .filter((post) => post.slug !== slug)
      .slice(0, 3)
  }

  const featuredPosts = getStaticFeaturedPosts(locale, {
    excludedPostSlug: post.slug,
  })

  if (post.questions && post.questions.length > 0) {
    post.questions = await Promise.all(
      post.questions.map(({ answer, ...question }: Record<string, 'answer'>) =>
        markdownToHtml(answer).then((content) => ({
          ...question,
          answer: content,
        }))
      )
    )
  }

  return {
    props: {
      page: {
        ...post,
        content,
        relatedPosts,
        featuredPosts,
      },
      locale,
    },
  }
}

export function getStaticPaths({
  locale = process.env.DEFAULT_LOCALE,
}: {
  locale: string | undefined
}): Record<string, unknown> {
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
