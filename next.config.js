const withOptimizedImages = require('next-optimized-images')

// const SEO = require('./next-seo.config')

module.exports = withOptimizedImages({
  // i18n: SEO.i18n,

  trailingSlash: true,

  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  removeOriginalExtension: false,
  optimizeImages: true,
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80,
  },
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: false,
  responsive: {
    adapter: require('responsive-loader/sharp'),
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75,
  },
})
