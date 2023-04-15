import React from 'react'

import OutboundLink from '@components/OutboundLink'

interface Props {
  title: React.ReactNode
  description: React.ReactNode
  button: React.ReactNode
}

export const CTACard: React.FC<Props> = ({ title, description, button }) => {
  return (
    <div className="border border-gray-100 text-center rounded p-6 my-4 w-full dark:border-gray-700 bg-sky-100 dark:bg-sky-800">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        {description}
      </p>
      <div className="w-full text-center mt-4">
        {button}
      </div>
    </div>
  )
}
