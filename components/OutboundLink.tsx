interface Props {
  className?: string
  href: string
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const OutboundLink: React.FC<Props> = ({
  className,
  href,
  children,
  onClick,
}) => (
  <a
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    onClick={onClick}
  >
    {children}
  </a>
)

export default OutboundLink
