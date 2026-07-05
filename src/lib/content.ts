import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
// lodash is CJS — import via default to avoid named-export ESM errors
import _lodash from 'lodash'
const { camelCase, kebabCase, uniq } = _lodash
import { SITE, getDomainFromLocale } from '../config/site'

export type PostEntry = CollectionEntry<'posts'>
export type SnippetEntry = CollectionEntry<'snippets'>
export type PageEntry = CollectionEntry<'pages'>
export type NewsletterEntry = CollectionEntry<'newsletter'>

export type ContentTag = {
  name: string
  slug: string
  hashtag: string
  posts: PostEntry[]
  snippets: SnippetEntry[]
}

export function getPostUrl(entry: PostEntry): string {
  return entry.data.locale === SITE.locale
    ? `/blog/${entry.data.slug}`
    : `https://${getDomainFromLocale(entry.data.locale)}/blog/${
        entry.data.slug
      }`
}

export function getSnippetUrl(entry: SnippetEntry): string {
  return entry.data.locale === SITE.locale
    ? `/blog/snippets/${entry.data.slug}`
    : `https://${getDomainFromLocale(entry.data.locale)}/blog/snippets/${
        entry.data.slug
      }`
}

export function getNewsletterSlug(entry: NewsletterEntry): string {
  return entry.id.split('/').pop()!
}

export async function getAllPosts(
  includeAllLocales = false,
): Promise<PostEntry[]> {
  const entries = await getCollection('posts')
  const localeEntries = entries.filter((e) => e.data.locale === SITE.locale)

  if (!includeAllLocales) return localeEntries

  return entries.reduce((acc, curr) => {
    const currSlug = curr.data.slug
    const alreadyIncluded = acc.some((e) => {
      if (e.data.slug === currSlug) return true
      const alternate = e.data.alternate ?? {}
      return Object.values(alternate).includes(currSlug)
    })
    if (alreadyIncluded) return acc
    return [...acc, curr]
  }, localeEntries)
}

export async function getAllSnippets(
  includeAllLocales = false,
): Promise<SnippetEntry[]> {
  const entries = await getCollection('snippets')
  const localeEntries = entries.filter((e) => e.data.locale === SITE.locale)

  if (!includeAllLocales) return localeEntries

  return entries.reduce((acc, curr) => {
    const currSlug = curr.data.slug
    const alreadyIncluded = acc.some((e) => {
      if (e.data.slug === currSlug) return true
      const alternate = e.data.alternate ?? {}
      return Object.values(alternate).includes(currSlug)
    })
    if (alreadyIncluded) return acc
    return [...acc, curr]
  }, localeEntries)
}

export async function getAllTags(): Promise<ContentTag[]> {
  const posts = await getAllPosts()
  const snippets = await getAllSnippets()

  const allTagNames = [
    ...posts.flatMap((p) => p.data.tags),
    ...snippets.flatMap((s) => s.data.tags),
  ]
  const uniqTags = uniq(allTagNames)

  return uniqTags.map((tag) => ({
    name: tag,
    slug: kebabCase(tag),
    hashtag: camelCase(tag),
    posts: posts.filter((p) => p.data.tags.includes(tag)),
    snippets: snippets.filter((s) => s.data.tags.includes(tag)),
  }))
}

export async function getTagBySlug(slug: string): Promise<ContentTag | null> {
  const tags = await getAllTags()
  return tags.find((t) => t.slug === slug) ?? null
}

export async function getTagByName(name: string): Promise<ContentTag | null> {
  const tags = await getAllTags()
  return tags.find((t) => t.name === name) ?? null
}

export async function getAllTagsForPost(
  entry: PostEntry,
): Promise<ContentTag[]> {
  const results = await Promise.all(
    entry.data.tags.map((name) => getTagByName(name)),
  )
  return results.filter((t): t is ContentTag => t !== null)
}

export async function getAllTagsForSnippet(
  entry: SnippetEntry,
): Promise<ContentTag[]> {
  const results = await Promise.all(
    entry.data.tags.map((name) => getTagByName(name)),
  )
  return results.filter((t): t is ContentTag => t !== null)
}

export async function getPageBySlug(slug: string): Promise<PageEntry | null> {
  const entries = await getCollection('pages')
  // IDs are path-based: "en/_pages/home", "fr/_pages/uses", etc.
  // Filter by both slug and locale prefix from the path
  return (
    entries.find(
      (e) => e.data.slug === slug && e.id.startsWith(`${SITE.locale}/`),
    ) ?? null
  )
}

export async function getAllNewsletters(): Promise<NewsletterEntry[]> {
  return getCollection('newsletter')
}
