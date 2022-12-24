import Link from 'next/link'
import Card from './Card'

interface Props {
  className?: string
  title: string
  description: string
  url: string
  icon?: string
}

const SnippetCard: React.FC<Props> = ({
  className = '',
  url,
  ...props
}: Props) => (
  <Link href={url}>
    <a className={className}>
      <Card {...props} />
    </a>
  </Link>
)

export default SnippetCard
