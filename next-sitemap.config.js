/** @type {import('next-sitemap').IConfig} */

const { siteUrl } = require('./next-seo.config')

module.exports = {
  siteUrl,
  exclude: ['/blog/tags/*'],
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
