interface Props {
  title: string
  description: string
  icon?: string
}

const Card: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent rounded p-4 mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="leading-5 text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Card
