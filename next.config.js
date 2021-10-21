const withPlugins = require('next-compose-plugins')
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {}

const config = withPlugins([withContentlayer], nextConfig)

module.exports = config
