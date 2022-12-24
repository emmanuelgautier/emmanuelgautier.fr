interface Props {
  className?: string
  href: string
  children: React.ReactNode
  rel?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const OutboundLink: React.FC<Props> = ({
  className,
  href,
  children,
  rel = '',
  onClick,
}) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a
    className={className}
    target="_blank"
    rel={`${rel && rel + ' '}noopener noreferrer`}
    href={href}
    onClick={onClick}
  >
    {children}
  </a>
)

export default OutboundLink
