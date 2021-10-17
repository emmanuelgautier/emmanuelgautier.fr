import { getMDXComponent } from 'mdx-bundler/client'
import Link from 'next/link'
import { useMemo } from 'react'

import OutboundLink from './OutboundLink'

interface CustomLinkProps {
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

const MDXComponents = {
  a: CustomLink,
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
