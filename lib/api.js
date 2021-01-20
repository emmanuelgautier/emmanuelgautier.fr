import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const pagesDirectory = join(process.cwd(), 'content', '_pages')
const postsDirectory = join(process.cwd(), 'content', '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
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

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}
