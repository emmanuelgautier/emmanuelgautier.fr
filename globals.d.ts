declare module '*.md'

interface Window {
  gtag: (...args: any[]) => void
  dataLayer: Record<string, any>
}
