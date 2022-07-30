import Link from 'next/link'

import s from './BlogPostCard.module.css'

interface Props {
  title: string
  description: string
  slug: string
}

const BlogPostCard: React.FC<Props> = ({ title, description, slug }: Props) => (
  <Link href={`/blog/${slug}`}>
    <a className="w-full">
      <div className={s.root}>
        <div className={s.titleContainer}>
          <h4 className={s.title}>
            {title}
          </h4>
        </div>
        <p className={s.description}>{description}</p>
      </div>
    </a>
  </Link>
)

export default BlogPostCard
