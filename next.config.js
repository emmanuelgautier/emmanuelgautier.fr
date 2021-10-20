const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
}

const config = withPlugins(
  [
    withContentlayer,
    [
      optimizedImages,
      {
        // optimization disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
  ],
  nextConfig
)

module.exports = config
