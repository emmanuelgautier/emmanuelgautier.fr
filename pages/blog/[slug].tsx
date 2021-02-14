import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { kebabCase } from 'lodash'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import Link from 'next/link'
import { LinkedinShareButton, TwitterShareButton } from 'react-share'

import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import SEO, { blog as blogSEOConfig } from '../../next-seo.config'

import Layout from '../../components/Layout'

interface Props {
  page: {
    title: string
    description: string
    image: string
    tags: string[]
    slug: string
    updated: string
    created: string
    content: string
  }
}

export const config = { amp: 'hybrid' }

function BlogPost({ page }: Props) {
  const siteUrl = SEO.siteUrl
  const {
    title,
    description,
    image,
    tags,
    content,
    created,
    updated,
    slug,
  } = page
  const url = `${siteUrl}${blogSEOConfig.pathPrefix}/${slug}`
  const hashtags = tags.map((tag) => `${tag.split(' ').join('')}`)

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        canonical={`${blogSEOConfig.subdomain}/${blogSEOConfig.pathPrefix}/${slug}`}
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

      <div className="container w-full max-w-prose mx-auto mt-4">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
          <header className="pt-2">
            <div className="space-y-4 text-left">
              <h1 className="text-3xl leading-12 text-gray-800 md:text-4xl md:leading-14 mb-2">
                {title}
              </h1>

              <div className="grid grid-cols-2 justify-items-stretch py-1">
                <p className="text-gray-700">
                  <span>{format(new Date(created), 'PP')}</span>
                </p>

                <div className="justify-self-end text-sm">
                  <TwitterShareButton
                    url={url}
                    title={title}
                    via={SEO.twitter.site}
                    hashtags={hashtags}
                    resetButtonStyle={false}
                    related={[SEO.twitter.site]}
                    className="cursor-pointer h-6 w-6 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 mr-1 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={url}
                    summary={description}
                    source={SEO.person.name}
                    resetButtonStyle={false}
                    className="cursor-pointer h-6 w-6 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 mr-1 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6 mb-2">
            <div
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {tags && tags.length ? (
              <div className="py-2 my-4 md:my-8">
                {tags.map((tag) => (
                  <Link
                    key={tag + `-tag`}
                    href={`${blogSEOConfig.pathPrefix}/tags/${kebabCase(tag)}/`}
                  >
                    <a className="inline-block bg-gray-200 px-4 py-2 text-sm text-gray-700 mr-2 mb-2">
                      {tag}
                    </a>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
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
