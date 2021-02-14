import fs from 'fs'
import matter from 'gray-matter'
import { kebabCase, uniq } from 'lodash'
import { join } from 'path'

const pagesDirectory = join(process.cwd(), 'content', '_pages')
const postsDirectory = join(process.cwd(), 'content', '_posts')

export function getPostSlugs(lang) {
  return fs.readdirSync(join(postsDirectory, lang))
}

function getContentBySlug(directory, slug, lang, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(directory, lang, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getPageBySlug(slug, lang, fields = []) {
  return getContentBySlug(pagesDirectory, slug, lang, fields)
}

export function getPostBySlug(slug, lang, fields = []) {
  return getContentBySlug(postsDirectory, slug, lang, fields)
}

export function getPostsByTag(kebabCasedTag, lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs
    .map((slug) => getPostBySlug(slug, lang, ['slug', 'tags']))
    .filter((post) => post)
    .map(({ slug, tags = [] }) => ({ slug, tags: tags.map(kebabCase) }))
    .filter(({ tags }) => tags.indexOf(kebabCasedTag) != -1)
    .map(({ slug }) => getPostBySlug(slug, lang, fields))
}

export function getAllPosts(lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs.map((slug) => getPostBySlug(slug, lang, fields))
}

export function getFeaturedPosts(lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs
    .map((slug) => getPostBySlug(slug, lang, ['featured', 'slug']))
    .filter(({ featured }) => featured)
    .map(({ slug }) => getPostBySlug(slug, lang, fields))
}

export function getAllTags(lang) {
  const tags = getAllPosts(lang, ['tags'])
    .filter((post) => Array.isArray(post?.tags) && post.tags.length > 0)
    .reduce((acc, { tags }) => acc.concat(tags), [])
    .filter((tag) => tag)
  const uniqTags = uniq(tags)

  return uniqTags.map((tag) => ({ slug: kebabCase(tag), tag }))
}
