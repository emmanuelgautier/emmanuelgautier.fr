import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// YAML parses ISO 8601 timestamps as Date objects; normalize to string
const dateOrString = z
  .union([z.string(), z.date()])
  .transform((d) => (d instanceof Date ? d.toISOString() : d))

const posts = defineCollection({
  loader: glob({
    pattern: ['en/_posts/**/*.mdx', 'fr/_posts/**/*.mdx'],
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      created: dateOrString,
      updated: dateOrString.optional(),
      description: z.string(),
      image: image().optional(),
      featured: z.boolean().optional(),
      tags: z.array(z.string()),
      locale: z.enum(['en', 'fr']),
      alternate: z.record(z.string(), z.string()).optional(),
      questions: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .optional(),
    }),
})

const snippets = defineCollection({
  loader: glob({
    pattern: ['en/_snippets/*.mdx', 'fr/_snippets/*.mdx'],
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      slug: z.string(),
      tags: z.array(z.string()),
      locale: z.enum(['en', 'fr']),
      alternate: z.record(z.string(), z.string()).optional(),
      created: dateOrString,
      updated: dateOrString.optional(),
    }),
})

const pages = defineCollection({
  loader: glob({
    pattern: ['en/_pages/*.mdx', 'fr/_pages/*.mdx'],
    base: './src/content',
    // Use the file path (minus extension) as ID to avoid slug collisions
    // between en/ and fr/ pages that share the same slug value (e.g. 'index')
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
  }),
})

const newsletter = defineCollection({
  loader: glob({ pattern: '_newsletter/*.mdx', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      created: dateOrString,
      updated: dateOrString.optional(),
      description: z.string(),
      image: image().optional(),
    }),
})

export const collections = { posts, snippets, pages, newsletter }
