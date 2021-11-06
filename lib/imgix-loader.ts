import { ImageLoaderProps } from 'next/image'

function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src
}

function imgixLoader({
  root,
  src,
  width,
  quality,
}: ImageLoaderProps & { root: string }): string {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width]
  let paramsString = ''
  if (quality) {
    params.push('q=' + quality)
  }

  if (params.length) {
    paramsString = '?' + params.join('&')
  }
  return `${root}${normalizeSrc(src)}${paramsString}`
}

export default imgixLoader
