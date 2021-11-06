import { getMDXComponent } from 'mdx-bundler/client'
import Img, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import OutboundLink from './OutboundLink'

type CustomLinkProps = {
  href: string
  children: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    )
  }

  return (
    <OutboundLink href={href} {...props}>
      {children}
    </OutboundLink>
  )
}

const Image: React.FC<ImageProps> = ({ alt, title, ...props }) => (
  <Img
    layout="responsive"
    title={title || alt}
    className="rounded-sm"
    {...props}
  />
)

const MDXComponents = {
  a: CustomLink,
  Image,
}

interface ContentProps {
  content: {
    code: string
  }
}

const Content: React.FC<ContentProps> = ({ content, ...props }) => {
  const Component = useMemo(() => getMDXComponent(content.code), [content.code])

  return (
    <Component
      components={
        {
          ...MDXComponents,
        } as any
      }
      {...props}
    />
  )
}

export default Content
