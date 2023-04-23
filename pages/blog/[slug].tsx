import { format, parseISO } from 'date-fns'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  NextSeo,
} from 'next-seo'
import { useIntl } from 'react-intl'
import type { Post } from '.contentlayer/generated'

import BlogPostCard from '@components/BlogPostCard'
import Content from '@components/Content'
import Layout from '@components/Layout'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import NewsletterForm from '@components/NewsletterForm'
import ShareButtons from '@components/ShareButtons'
import CarbonAds from '@components/CarbonAds'
import { ConsultingCTA } from '@components/ConsultingCTA'
import { getAllPosts, getAllTagsForContent } from '@lib/content'
import { getLocale } from '@lib/get-localized-domain.mjs'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function BlogPost({
  page,
  tags,
  relatedPosts,
  featuredPosts,
  questions,
}: PageProps): React.ReactNode {
  const intl = useIntl()
  const { locale = getLocale() } = useRouter()
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
            tags: tags.map(({ name }) => name),
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

      <article className="px-4 md:px-8">
        <header className="my-4 flex flex-col lg:grid lg:grid-cols-8 lg:gap-4 max-w-8xl mx-auto">
          <div className="col-start-3 col-span-4">
            <Text variant="pageHeading">{title}</Text>

            <div className="flex flex-row justify-between items-start w-full mt-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <p>
                  <span>{`${person.name} / `}</span>
                  <span>{format(parseISO(created), 'MMMM dd, yyyy')}</span>
                </p>
              </div>
              <p className="min-w-32">{readingTime.text}</p>
            </div>
          </div>

          <div className="col-span-2">
            <CarbonAds />
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-4 justify-center max-w-8xl mx-auto">
          <div className="flex flex-col col-start-3 col-span-4">
            <div className="prose dark:prose-dark max-w-none w-full mb-8">
              <Text variant="body">
                <Content content={body} />
              </Text>
            </div>

            <ConsultingCTA />

            <ShareButtons
              url={url}
              title={title}
              description={description}
              tags={tags.map(({ hashtag }) => hashtag)}
            />

            <NewsletterForm />

            {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
              <div className="mt-8">
                <Text variant="sectionHeading">
                  {intl.formatMessage({ defaultMessage: 'Related Posts' })}
                </Text>

                {relatedPosts.map(({ description, slug, title, url }) => (
                  <BlogPostCard
                    key={`post-related-posts-${slug}`}
                    url={url}
                    title={title}
                    description={description}
                  />
                ))}
              </div>
            )}

            {Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
              <div className="mt-8">
                <Text variant="sectionHeading">
                  {intl.formatMessage({ defaultMessage: 'Featured Posts' })}
                </Text>

                {featuredPosts.map(({ description, slug, title, url }) => (
                  <BlogPostCard
                    key={`post-featured-posts-${slug}`}
                    url={url}
                    title={title}
                    description={description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const allPosts = getAllPosts(getLocale())
  const post = allPosts.find(({ slug: _slug }) => _slug === slug)
  if (!post) {
    throw new Error()
  }

  const tags = getAllTagsForContent(post)

  const relatedPosts = tags
    .reduce<Post[]>((acc, { posts }) => acc.concat(posts), [])
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .filter(({ slug: _slug }) => _slug !== slug)
    .slice(0, 3)
    .map(({ title, description, slug, url }) => ({
      title,
      description,
      slug,
      url,
    }))

  const featuredPosts = allPosts
    .filter(({ featured }) => featured)
    .filter(({ slug: _slug }) => _slug !== slug)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 3)
    .map(({ title, description, slug, url }) => ({
      title,
      description,
      slug,
      url,
    }))

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: post,
      tags: tags.map(({ hashtag, name, slug }) => ({ hashtag, name, slug })),
      relatedPosts,
      featuredPosts,
      questions: [],
    },
  }
}

export function getStaticPaths() {
  return {
    paths: getAllPosts(getLocale()).map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
