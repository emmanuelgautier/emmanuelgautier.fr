declare module '*.md'

declare namespace JSX {
  interface AmpImg {
    className?: string
    alt?: string
    src?: src
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

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.jpeg' {
  const content: any
  export default content
}

declare module '*.gif' {
  const content: any
  export default content
}
