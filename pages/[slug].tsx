import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPages } from '.contentlayer/data'
import type { Page } from '.contentlayer/types'

import loadIntlMessages from '../lib/loadIntlMessages'

import Content from '../components/Content'
import Layout from '../components/Layout'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function PagePost({ page }: PageProps): React.ReactNode {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: { siteUrl },
    },
  } = getConfig()

  const { title, description, body, slug } = page

  return (
    <Layout title={title} description={description}>
      <NextSeo title={title} description={description} />

      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: intl.formatMessage({ defaultMessage: 'Home' }),
            item: `${siteUrl}`,
          },
          {
            position: 2,
            name: title,
            item: `${siteUrl}/${slug}`,
          },
        ]}
      />

      <div className="container w-full max-w-prose mx-auto mb-8">
        <article className="mx-auto max-w-3xl xl:max-w-5xl">
          <header className="pt-2">
            <div className="space-y-4 text-left">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                {title}
              </h1>
            </div>
          </header>

          <div className="prose dark:prose-dark max-w-none w-full mt-8">
            <Content content={body} />
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default PagePost

export async function getStaticProps(ctx: any) {
  const { slug } = ctx.params
  const page = allPages.find(({ slug: _slug }) => _slug === slug)
  if (!page) {
    throw new Error()
  }

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: allPages
      .filter(({ slug }) => slug != 'index')
      .map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
