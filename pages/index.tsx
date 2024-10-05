import { capitalize } from 'lodash'
import { InferGetStaticPropsType } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { allPages } from '.contentlayer/generated'

import Layout from '@components/Layout'
import ProfileImg from '@components/ProfileImg'
import BlogPostCard from '@components/BlogPostCard'
import Content from '@components/Content'
import NewsletterForm from '@components/NewsletterForm'
import Text from '@components/Text'
import loadIntlMessages from '@lib/load-intl-messages'
import ProjectCard from '@components/ProjectCard'
import { getAllPosts } from '@lib/content'
import { getLocale } from '@lib/get-localized-domain.mjs'
import { ConsultingCTA } from '@components/ConsultingCTA'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

function Home({
  locale,
  page: { body, title, description },
  featuredPosts,
}: PageProps): React.ReactNode {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
      },
    },
  } = getConfig()

  return (
    <Layout title={title} description={description} className="flex flex-col px-8 justify-center max-w-4xl mx-auto">
      <NextSeo
        languageAlternates={(domains as any[]).map(
          ({ domain, defaultLocale }) => ({
            hrefLang: defaultLocale,
            href: `https://${domain}`,
          })
        )}
      />

      <div className="flex flex-col-reverse sm:flex-row items-start border-b border-1 border-gray-200 dark:border-gray-800 pb-8 mt-4">
        <div className="flex flex-col pr-4">
          <Text variant="heading">{title}</Text>
          <div className="prose dark:prose-dark text-base sm:text-lg md:text-xl">
            <Content content={body} />
          </div>
        </div>
        <div className="h-40 w-40 mx-auto">
          <ProfileImg width={250} height={250} title={title} />
        </div>
      </div>

      <div className="my-4 border-b border-1 border-gray-200 dark:border-gray-800 pb-8">
        <Text variant="sectionHeading">
          {capitalize(intl.formatMessage({ defaultMessage: 'Projects' }))}
        </Text>

        <ProjectCard
          title="CerberAuth"
          description="Exploring OAuth, OpenID Connect, and IAM Solutions for Modern Security."
          href="https://www.cerberauth.com/"
        />

        <ProjectCard
          title="VulnAPI"
          description="VulnAPI is an open-source project designed to help you scan your APIs for common security vulnerabilities and weaknesses."
          href="https://vulnapi.cerberauth.com/"
        />

        {locale === 'fr' && (
          <>
            <ProjectCard
              title="Planète Durable"
              description="Chaque geste compte. Planète Durable partage des conseils, innovations et initiatives veillant à préserver notre planète."
              href="https://www.planete-durable.fr"
            />

            <ProjectCard
              title="Compeco"
              description="Trouvez les produits les plus durables et économiques au meilleur prix !"
              href="https://www.compeco.fr"
            />
          </>
        )}
      </div>

      <ConsultingCTA />

      {Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
        <div className="my-4 border-b border-1 border-gray-200 dark:border-gray-800 pb-8">
          <Text variant="sectionHeading">
            {capitalize(intl.formatMessage({ defaultMessage: 'Blog' }))}
          </Text>

          {featuredPosts.map(({ slug, title, description, url }) => (
            <BlogPostCard
              key={`homepage-featuredpost-${slug}`}
              url={url}
              title={title}
              description={description}
            />
          ))}
        </div>
      )}

      <NewsletterForm />
    </Layout >
  )
}

export default Home

export async function getStaticProps(ctx: any) {
  const page = allPages.find(({ slug }) => slug === 'index')!

  const featuredPosts = getAllPosts(getLocale())
    .filter(({ featured }) => featured)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 3)

  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
      page,
      featuredPosts,
      locale: getLocale(),
    },
  }
}
