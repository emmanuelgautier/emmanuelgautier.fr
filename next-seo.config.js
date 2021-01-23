module.exports = {
  siteUrl: process.env.DOMAIN || 'www.emmanuelgautier.fr',

  socials: [
    'https://github.com/emmanuelgautier',
    'https://twitter.com/gautier_manu',
    'https://www.linkedin.com/in/emmanuelgautier1',
  ],

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',

    domains: [
      {
        domain: 'www.emmanuelgautier.fr',
        defaultLocale: 'fr',
      },

      {
        domain: 'www.emmanuelgautier.com',
        defaultLocale: 'en',
      },
    ],
  },

  openGraph: {
    type: 'website',
    site_name: 'Emmanuel Gautier',
  },

  twitter: {
    handle: '@gautier_manu',
    site: '@gautier_manu',
    cardType: 'summary_large_image',
  },
}
