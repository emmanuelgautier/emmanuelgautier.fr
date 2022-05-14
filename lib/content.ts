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

const computeTags = (): ContentTag[] => {
  const tags = ([] as Content[])
    .concat(allPosts, allSnippets)
    .reduce<string[]>((acc, { tags }) => acc.concat(tags), [])
  const uniqTags = uniq(tags)

  computedTags = uniqTags.map((tag) => ({
    name: tag,
    slug: kebabCase(tag),
    hashtag: camelCase(tag),
    posts: allPosts.filter((post) => post.tags.includes(tag)),
    snippets: allSnippets.filter((snippet) => snippet.tags.includes(tag)),
  }))

  return computedTags
}

export const getAllTags = (): ContentTag[] => {
  if (computedTags === null) {
    return computeTags()
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
