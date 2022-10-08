/** @type {import('next-sitemap').IConfig} */

const { siteUrl, i18n } = require('./next-seo.config')

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{
      userAgent: '*',
      allow: '/',
      disallow: '/cdn-cgi/'
    }]
  },
  alternateRefs: i18n.domains.map(({ domain, defaultLocale }) => ({
    href: domain,
    hreflang: defaultLocale,
  })),
}
