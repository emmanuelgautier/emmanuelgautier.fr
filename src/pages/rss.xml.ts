import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '../config/site'

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')

  const localeItems = posts
    .filter((entry) => entry.data.locale === SITE.locale)
    .sort(
      (a, b) =>
        new Date(b.data.created).getTime() - new Date(a.data.created).getTime(),
    )

  return rss({
    title: SITE.rss.title,
    description: '',
    site: context.site ?? SITE.siteUrl,
    items: localeItems.map((entry) => ({
      title: entry.data.title,
      pubDate: new Date(entry.data.created),
      description: entry.data.description,
      link: `/blog/${entry.data.slug}/`,
    })),
  })
}
