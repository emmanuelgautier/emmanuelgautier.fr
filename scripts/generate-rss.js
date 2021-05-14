const fs = require('fs')
const RSS = require('rss')

const { getAllPosts } = require('../lib/api')
const { person, siteUrl, rss: rssConfig } = require('../next-seo.config')

const fileName = 'rss.xml'

function generate() {
  const posts = getAllPosts(process.env.DEFAULT_LOCALE || 'en', [
    'title',
    'description',
    'slug',
    'created',
  ])
  const feed = new RSS({
    title: rssConfig.title,
    site_url: `${siteUrl}/`,
    feed_url: `${siteUrl}/${fileName}`,
  })

  posts
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .map((post) => {
      feed.item({
        title: post.title,
        guid: post.slug,
        url: `${siteUrl}/blog/${post.slug}`,
        date: post.created,
        description: post.description,
        author: person.name,
      })
    })

  const rss = feed.xml({ indent: true })
  fs.writeFileSync(`./public/${fileName}`, rss)
}

generate()
