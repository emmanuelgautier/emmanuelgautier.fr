interface Props {
  className?: string
  href: string
  children: React.ReactNode
}

function OutboundLink({ className, href, children }: Props) {
  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}

export default OutboundLink
