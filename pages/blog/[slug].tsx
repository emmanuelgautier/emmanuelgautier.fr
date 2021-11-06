import { format, parseISO } from 'date-fns'
import { kebabCase } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  NextSeo,
} from 'next-seo'
import { useIntl } from 'react-intl'
import { allPosts } from '.contentlayer/data'
import type { Post } from '.contentlayer/types'

import imgixLoader from '../../lib/imgix-loader'
import loadIntlMessages from '../../lib/loadIntlMessages'

import BlogPostCard from '../../components/BlogPostCard'
import Content from '../../components/Content'
import Layout from '../../components/Layout'
import OutboundLink from '../../components/OutboundLink'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const discussUrl = (url: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`

function BlogPost({
  page,
  relatedPosts,
  featuredPosts,
  questions,
}: PageProps): React.ReactNode {
  const intl = useIntl()
  const { locale = process.env.LOCALE as string } = useRouter()
  const {
    publicRuntimeConfig: {
      seo: {
        siteUrl,
        i18n: { domains },
        person,
      },
    },
  } = getConfig()

  const {
    alternate,
    title,
    description,
    image,
    tags,
    body,
    created,
    updated,
    slug,
    readingTime,
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
    const alternateSubdomain = (domains as any[]).find(
      ({ defaultLocale }) => alternateLang === defaultLocale
    )?.domain

    languageAlternates.push({
      hrefLang: alternateLang,
      href: `https://${alternateSubdomain}/blog/${alternateSlug}`,
    })
  }

  let images: string[] = []
  if (image) {
    images = [`${siteUrl}${image}`]
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
          images: images.map((_image) => ({
            url: _image,
            secureUrl: _image,
            alt: title,
          })),
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={images}
        datePublished={created}
        dateModified={updated}
        authorName={[person.name]}
        publisherName={person.name}
        publisherLogo={person.image}
        description={description}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: intl.formatMessage({ defaultMessage: 'Home' }),
            item: `${siteUrl}`,
          },
          {
            position: 2,
            name: intl.formatMessage({ defaultMessage: 'Blog' }),
            item: `${siteUrl}/blog`,
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
        <article className="mx-auto max-w-3xl xl:max-w-5xl">
          <header className="pt-2">
            <div className="space-y-4 text-left">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                {title}
              </h1>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span>{`${person.name} / `}</span>
                    <span>{format(parseISO(created), 'MMMM dd, yyyy')}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
                  {readingTime.text}
                </p>
              </div>
            </div>
          </header>

          <div className="prose dark:prose-dark max-w-none w-full mt-8">
            <Content content={body} />
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 mt-8">
            <OutboundLink href={discussUrl(url)}>
              {intl.formatMessage({ defaultMessage: 'Discuss on Twitter' })}
            </OutboundLink>
          </div>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt-8">
              {tags.map((tag) => (
                <Link key={`${tag}-tag`} href={`/blog/tags/${kebabCase(tag)}`}>
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

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const post = allPosts.find(({ slug: _slug }) => _slug === slug)
  if (!post) {
    throw new Error()
  }

  let relatedPosts: Post[] = []
  if (post.tags.length > 0) {
    relatedPosts = allPosts
      .filter(({ tags }) => tags.some((tag) => post.tags.includes(tag)))
      .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
      .filter(({ slug: _slug }) => _slug !== slug)
      .slice(0, 3)
  }

  const featuredPosts = allPosts
    .filter(({ featured }) => featured)
    .filter(({ slug: _slug }) => _slug !== slug)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 3)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: post,
      relatedPosts,
      featuredPosts,
      questions: [],
    },
  }
}

export function getStaticPaths() {
  return {
    paths: allPosts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
