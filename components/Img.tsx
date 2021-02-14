import clsx from 'clsx'
import { useAmp } from 'next/amp'
import { join } from 'path'

type Props = {
  path: string
  alt: string
  title: string
  width?: number
  height?: number
  className?: string
}

const publicDirectory = join(process.cwd(), 'public')

const Img: React.FC<Props> = ({
  path,
  alt,
  title,
  width,
  height,
  className,
}) => {
  const isAmp = useAmp()
  const src = join(publicDirectory, path)
  const customClassName = clsx('object-cover rounded-full', className)

  return (
    <>
      {isAmp ? (
        <amp-img
          className={customClassName}
          src={require(src)}
          alt={alt}
          height={height?.toString()}
          width={width?.toString()}
        />
      ) : (
        <picture>
          <source srcSet={require(`${src}?webp`)} type="image/webp" />
          <source srcSet={require(`${src}?png`)} type="image/png" />
          <img
            className={customClassName}
            src={require(src)}
            alt={alt}
            title={title}
          />
        </picture>
      )}
    </>
  )
}

export default Img
