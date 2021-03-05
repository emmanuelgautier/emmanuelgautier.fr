const subdomainFr = 'www.emmanuelgautier.fr'
const subdomainEn = 'www.emmanuelgautier.com'

const siteUrl = process.env.DOMAIN || subdomainFr
const blogSubdomain =
  siteUrl === subdomainFr ? 'blog.emmanuelgautier.fr' : subdomainEn

const person = 'Emmanuel Gautier'

module.exports = {
  siteUrl: `https://${siteUrl}`,

  socials: [
    'https://github.com/emmanuelgautier',
    'https://twitter.com/gautier_manu',
    'https://www.linkedin.com/in/emmanuelgautier1',
  ],

  blog: {
    pathPrefix: siteUrl === subdomainFr ? '/' : '/blog',
    subdomain: blogSubdomain,
  },

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',

    domains: [
      {
        domain: subdomainFr,
        defaultLocale: 'fr',
      },

      {
        domain: subdomainEn,
        defaultLocale: 'en',
      },
    ],
  },

  rss: {
    title: person
  },

  person: {
    name: person,
    image: '/images/profile.png',
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
