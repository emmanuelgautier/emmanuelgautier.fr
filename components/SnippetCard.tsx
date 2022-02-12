import Link from 'next/link'
import Card from './Card'

interface Props {
  className?: string
  title: string
  description: string
  slug: string
}

const SnippetCard: React.FC<Props> = ({
  slug,
  className = '',
  ...props
}: Props) => (
  <Link href={`/blog/snippets/${slug}`}>
    <a className={className}>
      <Card {...props} />
    </a>
  </Link>
)

export default SnippetCard
