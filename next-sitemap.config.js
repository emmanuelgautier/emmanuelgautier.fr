/** @type {import('next-sitemap').IConfig} */

const { siteUrl } = require('./next-seo.config')

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/cdn-cgi/',
      },
    ],
  },
}
