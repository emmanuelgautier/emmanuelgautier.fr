const withPlugins = require('next-compose-plugins')
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
