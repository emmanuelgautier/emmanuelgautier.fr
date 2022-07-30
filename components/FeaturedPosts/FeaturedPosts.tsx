import { allPosts, Post } from '.contentlayer/generated'
import BlogPostCard from '@components/BlogPostCard'

interface Props {}

const FeaturedPosts: React.FC<Props> = () => {
  const featuredPosts = allPosts
    .filter(({ featured }) => featured)
    .sort((post1, post2) => (post1.created > post2.created ? -1 : 1))
    .slice(0, 4)

  return (
    <>
      {featuredPosts.map(({ slug, title, description }) => (
        <BlogPostCard
          key={`featured-post-${slug}`}
          slug={slug}
          title={title}
          description={description}
        />
      ))}
    </>
  )
}

export default FeaturedPosts
