import remarkExternalLinks from 'remark-external-links'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import remarkPrism from 'remark-prism'
import remarkStringify from 'remark-stringify'
import Unified from 'unified'

export default function markdownToHtml(markdown) {
  return Unified()
    .use(remarkParse)
    .use(remarkPrism, {
      transformInlineCode: true,
      plugins: ['command-line', 'data-uri-highlight', 'inline-color'],
    })
    .use(remarkStringify)
    .use(remarkExternalLinks)
    .use(remarkHtml)
    .process(markdown)
    .then((file) => String(file))
}
