import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { allNewsletters } from '.contentlayer/generated'

import Layout from '@components/Layout'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function NewsletterIndex({ page }: PageProps): React.ReactElement {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
        siteUrl,
      },
    },
  } = getConfig()

  const { newsletters } = page
  const title = 'Newsletters'
  const description =
    'This is the newsletter page talking about various topics.'
  const url = `${siteUrl}/newsletter`

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
        languageAlternates={(domains as any[]).map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}/newsletter`,
          })
        )}
      />

      <div className="flex flex-col justify-center items-start mb-16">
        <Text variant="pageHeading">{title}</Text>

        <section>
          <Text variant="sectionHeading">All Issues</Text>

          {newsletters.map(({ slug, title }) => (
            <Link
              className="block mb-4"
              key={`newsletter-issues-${slug}`}
              href={`/newsletter/${slug}`}
            >
              <Text>{title}</Text>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default NewsletterIndex

export async function getStaticProps(ctx: any) {
  const newsletters = allNewsletters.sort(
    (newsletter1: any, newsletter2: any) =>
      newsletter1.created > newsletter2.created ? -1 : 1
  )

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page: {
        newsletters,
      },
    },
  }
}
