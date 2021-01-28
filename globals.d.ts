declare module '*.md'

declare namespace JSX {
  interface AmpImg {
    className?: string
    alt?: string
    src?: string
    width?: string
    height?: string
    layout?: string
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
  }
}
