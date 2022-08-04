import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

import remarkImgToJsx from './lib/remark-img-to-jsx'
import { getDomainFromLocale, getLocale } from './lib/get-localized-domain'

const locale = getLocale()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
}

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/_posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    created: { type: 'string', required: true },
    updated: { type: 'string', required: false },
    description: { type: 'string', required: true },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', required: false },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    locale: { type: 'enum', options: ['en', 'fr'], required: true },
    alternate: { type: 'json', required: false },
    questions: { type: 'json', required: false },
  },
  computedFields: {
    ...computedFields,
    url: {
      type: 'string',
      resolve: (doc) =>
        doc.locale === locale
          ? `/blog/${doc.slug}`
          : `https://${getDomainFromLocale(doc.locale)}/blog/${doc.slug}`,
    },
  },
}))

const Newsletter = defineDocumentType(() => ({
  name: 'Newsletter',
  filePathPattern: `_newsletter/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    created: { type: 'string', required: true },
    updated: { type: 'string', required: false },
    description: { type: 'string', required: true },
    image: { type: 'string', required: false },
  },
  computedFields: {
    ...computedFields,
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `${locale}/_pages/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string', required: false },
  },
  computedFields,
}))

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: `**/_snippets/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    locale: { type: 'enum', options: ['en', 'fr'], required: true },
    alternate: { type: 'json', required: false },
    created: { type: 'string', required: true },
    updated: { type: 'string', required: false },
  },
  computedFields: {
    ...computedFields,
    url: {
      type: 'string',
      resolve: (doc) =>
        doc.locale === locale
          ? `/blog/${doc.slug}`
          : `${getDomainFromLocale(doc.locale)}/blog/${doc.slug}`,
    },
  },
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Newsletter, Page, Snippet],
  mdx: {
    remarkPlugins: [remarkGfm, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})

export default contentLayerConfig
