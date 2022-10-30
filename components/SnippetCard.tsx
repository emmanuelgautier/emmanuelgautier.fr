import Link from 'next/link'
import Card from './Card'

interface Props {
  className?: string
  title: string
  description: string
  slug: string
  icon?: string
}

const SnippetCard: React.FC<Props> = ({
  slug,
  className = '',
  ...props
}: Props) => (
  <Link className={className} href={`/blog/snippets/${slug}`}>
    <Card {...props} />
  </Link>
)

export default SnippetCard
