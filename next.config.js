const withPlugins = require('next-compose-plugins')
const { withContentlayer } = require('next-contentlayer')

const seoConfig = require('./next-seo.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  publicRuntimeConfig: {
    seo: seoConfig,
  },

  images: {
    loader: 'imgix',
    path: 'https://emmanuelgautier-website.imgix.net/',
  },

  webpack(config, { dev, ...other }) {
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias['@formatjs/icu-messageformat-parser'] =
        '@formatjs/icu-messageformat-parser/no-parser'
    }
    return config
  },
}

const config = withPlugins([withContentlayer], nextConfig)

module.exports = config
