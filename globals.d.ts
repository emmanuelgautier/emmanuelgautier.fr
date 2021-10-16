declare module '*.md'

declare namespace JSX {
  interface AmpImg {
    className?: string
    alt?: string
    src?: string | StaticImageData
    width?: string
    height?: string
    layout?: string
  }
  interface AmpAnalytics {
    type: string
    'data-credentials': string
    children: ReactElement
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-analytics': AmpAnalytics
  }
}
