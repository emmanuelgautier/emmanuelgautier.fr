const frLocale = 'fr'
const enLocale = 'en'

const subdomainFr = 'www.emmanuelgautier.fr'
const subdomainEn = 'www.emmanuelgautier.com'

const siteDomain = getSiteDomain()
const siteUrl = `https://${siteDomain}`
const blogSubdomain =
  siteDomain === subdomainFr ? 'blog.emmanuelgautier.fr' : subdomainEn

const person = 'Emmanuel Gautier'

module.exports = {
  siteUrl,

  socials: [
    'https://github.com/emmanuelgautier',
    'https://twitter.com/gautier_manu',
    'https://www.linkedin.com/in/emmanuelgautier1',
  ],

  blog: {
    pathPrefix: siteUrl === subdomainFr ? '' : '/blog',
    subdomain: blogSubdomain,
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
    title: person
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
