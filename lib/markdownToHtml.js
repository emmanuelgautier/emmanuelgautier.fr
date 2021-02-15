import remarkExternalLinks from 'remark-external-links'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import remarkPrism from 'remark-prism'
import remarkStringify from 'remark-stringify'
import Unified from 'unified'

export default async function markdownToHtml(markdown) {
  const result = await Unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkExternalLinks)
    .use(remarkHtml)
    .process(markdown)

  return result.toString()
}
