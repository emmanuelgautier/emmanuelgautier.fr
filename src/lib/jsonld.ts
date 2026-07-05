import { SITE } from '../config/site'

export function articleJsonLd({
  url,
  title,
  images,
  datePublished,
  dateModified,
  description,
}: {
  url: string
  title: string
  images: string[]
  datePublished: string
  dateModified?: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    url,
    headline: title,
    image: images,
    datePublished,
    dateModified: dateModified || datePublished,
    author: [{ '@type': 'Person', name: SITE.person.name }],
    publisher: {
      '@type': 'Person',
      name: SITE.person.name,
      logo: { '@type': 'ImageObject', url: SITE.person.image },
    },
    description,
  }
}

export function breadcrumbJsonLd(
  items: Array<{ position: number; name: string; item: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ position, name, item }) => ({
      '@type': 'ListItem',
      position,
      name,
      item,
    })),
  }
}

export function faqPageJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function socialProfileJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.person.name,
    url: `${SITE.siteUrl}/`,
    sameAs: Object.values(SITE.socials),
  }
}
