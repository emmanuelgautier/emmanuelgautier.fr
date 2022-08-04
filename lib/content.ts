import { camelCase, kebabCase, uniq } from 'lodash'

import { allPosts, allSnippets, Post, Snippet } from '.contentlayer/generated'

export type ContentTag = {
  name: string
  slug: string
  hashtag: string
  posts: Post[]
  snippets: Snippet[]
}

type Content = Post | Snippet

let computedTags: ContentTag[] | null = null

const computeTags = (locale: string): ContentTag[] => {
  const localizedAllPosts = getAllPosts(locale)
  const localizedAllSnippets = getAllSnippets(locale)

  const tags = ([] as Content[])
    .concat(localizedAllPosts, localizedAllSnippets)
    .reduce<string[]>((acc, { tags }) => acc.concat(tags), [])
  const uniqTags = uniq(tags)

  computedTags = uniqTags.map((tag) => ({
    name: tag,
    slug: kebabCase(tag),
    hashtag: camelCase(tag),
    posts: localizedAllPosts.filter((post) => post.tags.includes(tag)),
    snippets: localizedAllSnippets.filter((snippet) =>
      snippet.tags.includes(tag)
    ),
  }))

  return computedTags
}

const getAllContent = <T extends Post | Snippet>(
  allContents: T[],
  locale = 'en',
  includeAllLocales = false
): T[] => {
  const localeContent = allContents.filter(
    ({ locale: _locale }) => _locale === locale
  )
  if (!includeAllLocales) {
    return localeContent
  }

  return allContents.reduce((acc, curr) => {
    if (
      acc.findIndex(
        ({ slug, alternate = {} }) =>
          slug === curr.slug ||
          Object.values(alternate).indexOf(curr.slug) !== -1
      ) !== -1
    ) {
      return acc
    }

    return acc.concat(curr)
  }, localeContent)
}

export const getAllPosts = (
  locale = 'en',
  includeAllLocales = false
): Post[] => {
  return getAllContent(allPosts, locale, includeAllLocales)
}

export const getAllSnippets = (
  locale = 'en',
  includeAllLocales = false
): Snippet[] => {
  return getAllContent(allSnippets, locale, includeAllLocales)
}

export const getAllTags = (locale = 'en'): ContentTag[] => {
  if (computedTags === null) {
    return computeTags(locale)
  }

  return computedTags
}

export const getTagBySlug = (slug: string): ContentTag | null => {
  const tag = getAllTags().find((tag) => tag.slug === slug)

  return tag || null
}

export const getTagByName = (name: string): ContentTag | null => {
  const tag = getAllTags().find((tag) => tag.name === name)

  return tag || null
}

export const getAllTagsForContent = (content: Content): ContentTag[] => {
  const tags = content.tags
    .map((tag) => getTagByName(tag))
    .filter((tag) => tag !== null)

  return tags as ContentTag[]
}
