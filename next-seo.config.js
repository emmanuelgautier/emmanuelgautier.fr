const frLocale = 'fr'
const enLocale = 'en'

const subdomainFr = 'www.emmanuelgautier.fr'
const subdomainEn = 'www.emmanuelgautier.com'

const siteDomain = getSiteDomain()
const siteUrl = `https://${siteDomain}`

const person = 'Emmanuel Gautier'

module.exports = {
  siteUrl,

  socials: {
    github: 'https://github.com/emmanuelgautier',
    twitter: 'https://twitter.com/gautier_manu',
    linkedin: 'https://www.linkedin.com/in/emmanuelgautier1',
  },

  blog: {
    pathPrefix: '/blog',
  },

  i18n: {
    locales: [frLocale, enLocale],
    defaultLocale: frLocale,

    domains: [
      {
        domain: subdomainFr,
        defaultLocale: frLocale,
      },

      {
        domain: subdomainEn,
        defaultLocale: enLocale,
      },
    ],
  },

  rss: {
    title: person,
  },

  person: {
    name: person,
    image: `${siteUrl}/images/profile.png`,
  },

  openGraph: {
    type: 'website',
    site_name: person,
  },

  twitter: {
    handle: '@gautier_manu',
    site: '@gautier_manu',
    cardType: 'summary_large_image',
  },
}

function getSiteDomain() {
  if (process.env.DOMAIN) {
    return process.env.DOMAIN
  }

  switch (process.env.DEFAULT_LOCALE) {
    case enLocale:
      return subdomainEn

    case frLocale:
    default:
      return subdomainFr
  }
}
