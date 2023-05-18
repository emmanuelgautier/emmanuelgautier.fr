import {
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'
import {
  ContentLayerArticleFields,
  ContentLayerWebsiteFields,
  ContentLayerWebPageElementFields,
  ContentLayerOrganizationFields,
  ContentLayerPageFields,
  ContentLayerPersonFields
} from '@withmoons/explorer'

const Article = defineDocumentType(() => ({
  ...ContentLayerArticleFields,
  filePathPattern: 'articles/**/*.mdx',
  contentType: 'mdx',
}))

const Page = defineDocumentType(() => ({
  ...ContentLayerPageFields,
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
}))

const Person = defineDocumentType(() => ({
  ...ContentLayerPersonFields,
  filePathPattern: 'persons/**/*.mdx',
  contentType: 'mdx',
}))

const Organization = defineDocumentType(() => ({
  ...ContentLayerOrganizationFields,
  filePathPattern: 'organizations/**/*.mdx',
  contentType: 'mdx',
}))

const Website = defineDocumentType(() => ({
  ...ContentLayerWebsiteFields,
  filePathPattern: 'websites/*.mdx',
  contentType: 'mdx',
}))

const WebpageElement = defineDocumentType(() => ({
  ...ContentLayerWebPageElementFields,
  filePathPattern: 'elements/*.mdx',
  contentType: 'mdx'
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, Organization, Page, Person, Website, WebpageElement],
  mdx: {},
  disableImportAliasWarning: true,
})

export default contentLayerConfig
