// const SEO = require('./next-seo.config')

module.exports = {
  trailingSlash: true,

  images: {
    loader: 'cloudinary',
    domains: ['res.cloudinary.com'],
  },

  experimental: {
    amp: {
      skipValidation: true,
    },
  },
}
