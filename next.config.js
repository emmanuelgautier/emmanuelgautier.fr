module.exports = {
  images: {
    loader: 'cloudinary',
    path: process.env.CLOUDINARY_API,
    domains: ['res.cloudinary.com/'],
  },

  webpack: (configuration) => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    })
    return configuration
  },
}
