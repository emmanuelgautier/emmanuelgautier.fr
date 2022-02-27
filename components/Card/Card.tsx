import Image from 'next/image'

interface Props {
  title: string
  description: string
  icon?: string
}

const Card: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <div className="flex justify-between border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent rounded p-6 mb-4">
      <div className="px-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="leading-5 text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>

      {icon && (
        <div className="px-2">
          <Image
            src={icon}
            alt={title}
            title={title}
            width={56}
            height={56}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  )
}

export default Card
