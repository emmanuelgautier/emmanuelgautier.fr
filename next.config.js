// const SEO = require('./next-seo.config')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  trailingSlash: true,

  images: {
    disableStaticImages: true,
  },

  experimental: {
    amp: {
      skipValidation: true,
    },
  },
}

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
  ],
  nextConfig
)

module.exports = config
