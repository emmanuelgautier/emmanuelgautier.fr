const frLocale = 'fr'
const enLocale = 'en'

const subdomainFr = 'www.emmanuelgautier.fr'
const subdomainEn = 'www.emmanuelgautier.com'

const { siteDomain, analyticsDomain, commentsDomain } = getDomains()
const siteUrl = `https://${siteDomain}`

const person = 'Emmanuel Gautier'

module.exports = {
  siteDomain,
  siteUrl,
  analyticsDomain,
  commentsDomain,

  socials: {
    github: 'https://github.com/emmanuelgautier',
    twitter: 'https://twitter.com/gautier_manu',
    linkedin: 'https://www.linkedin.com/in/emmanuelgautier1',
    mastodon: 'https://mastodon.online/@emmanuelgautier',
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
    handle_simple: 'gautier_manu',
    cardType: 'summary_large_image',
  },
}

function getDomains() {
  switch (process.env.LOCALE) {
    case enLocale:
      return {
        siteDomain: subdomainEn,
        analyticsDomain: 'emmanuelgautier.com',
        commentsDomain: 'comments.emmanuelgautier.com',
      }

    case frLocale:
    default:
      return {
        siteDomain: subdomainFr,
        analyticsDomain: 'emmanuelgautier.fr',
        commentsDomain: 'comments.emmanuelgautier.fr',
      }
  }
}
