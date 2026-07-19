import { defineConfig } from 'astro/config'
import { rename } from 'node:fs/promises'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { visit } from 'unist-util-visit'

const locale = process.env.PUBLIC_LOCALE || 'en'
const siteUrl =
  locale === 'fr'
    ? 'https://www.emmanuelgautier.fr'
    : 'https://www.emmanuelgautier.com'

const excludedDomains = [
  'emmanuelgautier.fr',
  'emmanuelgautier.com',
  'cerberauth.com',
]

// Code fences use a `lang:title` convention (e.g. ```yaml:docker-compose.yml```)
// to show a filename. Shiki only understands real language ids, so split the
// title off before it reaches the highlighter.
function remarkSplitCodeTitle() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (!node.lang) {
        return
      }

      const separatorIndex = node.lang.indexOf(':')
      if (separatorIndex === -1) {
        return
      }

      const title = node.lang.slice(separatorIndex + 1)
      node.lang = node.lang.slice(0, separatorIndex)
      node.meta = node.meta ? `title="${title}" ${node.meta}` : `title="${title}"`
    })
  }
}

function renameSitemapIndex() {
  return {
    name: 'rename-sitemap-index',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await rename(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir))
      },
    },
  }
}

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    remarkPlugins: [remarkSplitCodeTitle],
    shikiConfig: {
      langAlias: {
        git: 'shell',
      },
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'nofollow'],
          test: (element) => {
            const href = element.properties?.href
            if (!href || typeof href !== 'string') {
              return false
            }

            try {
              const url = new URL(href, siteUrl)
              return !excludedDomains.some((domain) =>
                url.hostname.includes(domain),
              )
            } catch {
              return false
            }
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/blog/tags/'),
    }),
    renameSitemapIndex(),
  ],
})
