import Link from 'next/link'

interface Props {
  title: string
  description: string
  url: string
}

const BlogPostCard: React.FC<Props> = ({ title, description, url }: Props) => (
  <Link className="w-full" href={url}>
    <div className="mb-8 w-full">
      <div className="flex flex-col md:flex-row justify-between">
        <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
          {title}
        </h4>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </Link>
)

export default BlogPostCard
