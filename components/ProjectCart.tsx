import OutboundLink from './OutboundLink'

interface Props {
  title: string,
  description: string,
  href: string,
  icon?: string
}

const ProjectCard = ({ title, description, href }: Props) => (
  <OutboundLink className="block mb-4 hover:shadow" href={href}>
    <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded p-4">
      <div>
        <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h4>
        <p className="leading-5 text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  </OutboundLink>
)

export default ProjectCard
