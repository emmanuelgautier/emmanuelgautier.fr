import profileImage from '../assets/images/profile.png'

const locale = (import.meta.env.PUBLIC_LOCALE as string) || 'en'

const domainMap: Record<string, string> = {
  en: 'www.emmanuelgautier.com',
  fr: 'www.emmanuelgautier.fr',
}

const analyticsDomainMap: Record<string, string> = {
  en: 'emmanuelgautier.com',
  fr: 'emmanuelgautier.fr',
}

const commentsDomainMap: Record<string, string> = {
  en: 'comments.emmanuelgautier.com',
}

const siteDomain = domainMap[locale] ?? domainMap.en
const siteUrl = `https://${siteDomain}`
const analyticsDomain = analyticsDomainMap[locale] ?? analyticsDomainMap.en
const commentsDomain = commentsDomainMap[locale]

const person = 'Emmanuel Gautier'

export const SITE = {
  locale,
  siteDomain,
  siteUrl,
  analyticsDomain,
  commentsDomain,

  person: {
    name: person,
    image: `${siteUrl}${profileImage.src}`,
  },

  socials: {
    github: 'https://github.com/emmanuelgautier',
    twitter: 'https://twitter.com/gautier_manu',
    linkedin: 'https://www.linkedin.com/in/emmanuelgautier1',
    mastodon: 'https://mastodon.online/@emmanuelgautier',
  },

  twitter: {
    handle: '@gautier_manu',
    handle_simple: 'gautier_manu',
    cardType: 'summary_large_image',
  },

  domains: [
    { domain: 'www.emmanuelgautier.fr', defaultLocale: 'fr' },
    { domain: 'www.emmanuelgautier.com', defaultLocale: 'en' },
  ],

  rss: {
    title: person,
  },
}

export function getDomainFromLocale(loc: string): string {
  const entry = SITE.domains.find(({ defaultLocale }) => defaultLocale === loc)
  if (!entry) throw new Error(`No domain found for locale: ${loc}`)
  return entry.domain
}
