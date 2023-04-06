import Card from '../Card'
import OutboundLink from '../OutboundLink'

interface Props {
  title: string
  description: string
  href: string
  icon?: string
}

const ProjectCard: React.FC<Props> = ({ href, ...props }) => (
  <OutboundLink rel="noopener" href={href}>
    <Card {...props} />
  </OutboundLink>
)

export default ProjectCard
