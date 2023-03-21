import { writeFileSync } from 'fs'
import RSS from 'rss'

import { allPosts } from '../.contentlayer/generated/index.mjs'
import { getDomainFromLocale, getLocale } from '../lib/get-localized-domain.mjs'
import config from '../next-seo.config.js'

const { person, siteUrl, rss: rssConfig } = config

const fileName = 'rss.xml'

function generate() {
  const feed = new RSS({
    title: rssConfig.title,
    site_url: `${siteUrl}/`,
    feed_url: `${siteUrl}/${fileName}`,
  })

  const locale = getLocale()

  allPosts
    .filter(({ locale: _locale }) => locale === 'fr' || _locale === locale)
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .map((post) => {
      const url = `https://${getDomainFromLocale(post.locale)}/blog/${post.slug}`

      feed.item({
        title: post.title,
        guid: post.slug,
        url,
        date: post.created,
        description: post.description,
        author: person.name,
      })
    })

  const rss = feed.xml({ indent: true })
  writeFileSync(`./public/${fileName}`, rss)
}

generate()
