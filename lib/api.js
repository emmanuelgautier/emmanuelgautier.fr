const fs = require('fs')
const matter = require('gray-matter')
const { kebabCase, uniq } = require('lodash')
const { join } = require('path')

const pagesDirectory = join(process.cwd(), 'content', '_pages')
const postsDirectory = join(process.cwd(), 'content', '_posts')

const defaultFeaturedPostsNumber = 3

function getPostSlugs(lang) {
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

function getPageBySlug(slug, lang, fields = []) {
  return getContentBySlug(pagesDirectory, slug, lang, fields)
}

function getPostBySlug(slug, lang, fields = []) {
  return getContentBySlug(postsDirectory, slug, lang, fields)
}

function getPostsByTag(kebabCasedTag, lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs
    .map((slug) => getPostBySlug(slug, lang, ['slug', 'tags']))
    .filter((post) => post)
    .map(({ slug, tags = [] }) => ({ slug, tags: tags.map(kebabCase) }))
    .filter(({ tags }) => tags.indexOf(kebabCasedTag) != -1)
    .map(({ slug }) => getPostBySlug(slug, lang, fields))
}

function getAllPosts(lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs.map((slug) => getPostBySlug(slug, lang, fields))
}

function getFeaturedPosts(lang, fields = []) {
  const slugs = getPostSlugs(lang)

  return slugs
    .map((slug) => getPostBySlug(slug, lang, ['featured', 'slug']))
    .filter(({ featured }) => featured)
    .map(({ slug }) => getPostBySlug(slug, lang, fields))
}

function getAllTags(lang) {
  const tags = getAllPosts(lang, ['tags'])
    .filter((post) => Array.isArray(post?.tags) && post.tags.length > 0)
    .reduce((acc, { tags }) => acc.concat(tags), [])
    .filter((tag) => tag)
  const uniqTags = uniq(tags)

  return uniqTags.map((tag) => ({ slug: kebabCase(tag), tag }))
}

function getStaticFeaturedPosts(lang, props) {
  const { number = defaultFeaturedPostsNumber, excludedPostSlug } = props

  return getFeaturedPosts(lang, ['created', 'slug', 'title', 'description'])
    .filter(({ slug }) => slug !== excludedPostSlug)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, number)
}

exports.getPostSlugs = getPostSlugs
exports.getPageBySlug = getPageBySlug
exports.getPostBySlug = getPostBySlug
exports.getPostsByTag = getPostsByTag
exports.getAllPosts = getAllPosts
exports.getFeaturedPosts = getFeaturedPosts
exports.getAllTags = getAllTags
exports.getStaticFeaturedPosts = getStaticFeaturedPosts
