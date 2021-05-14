interface Props {
  className?: string
  href: string
  children: React.ReactNode
}

const OutboundLink: React.FC<Props> = ({
  className,
  href,
  children,
}: Props) => (
  <a
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export default OutboundLink
