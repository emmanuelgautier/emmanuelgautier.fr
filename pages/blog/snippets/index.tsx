import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { allSnippets } from '.contentlayer/data'

import loadIntlMessages from '../../../lib/loadIntlMessages'

import SnippetCard from '../../../components/SnippetCard'
import Layout from '../../../components/Layout'

import SEO from '../../../next-seo.config.js'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function SnippetsIndex({ page }: PageProps): React.ReactNode {
  const { snippets } = page
  const title = 'Snippets'
  const description = ''
  const url = `https://${SEO.siteUrl}/blog/snippets`

  return (
    <Layout title={title} description={description}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
        }}
        languageAlternates={SEO.i18n.domains.map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}/blog/snippets`,
          })
        )}
      />

      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>

        {snippets.map(({ slug, title, description }) => (
          <SnippetCard
            key={`snippets-${slug}`}
            title={title}
            slug={slug}
            summary={description}
          />
        ))}
      </div>
    </Layout>
  )
}

export default SnippetsIndex

export async function getStaticProps(ctx: any) {
  const snippets = allSnippets
    .sort((snippet1: any, snippet2: any) =>
      snippet1.created > snippet2.created ? -1 : 1
    )
    .slice(0, 30)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        snippets,
      },
    },
  }
}
