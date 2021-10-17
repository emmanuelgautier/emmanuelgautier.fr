import Link from 'next/link'
import { useIntl } from 'react-intl'

import OutboundLink from './OutboundLink'

import SEO from '../next-seo.config.js'

const Footer: React.FC = () => {
  const intl = useIntl()

  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full p-8 mb-4">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 pb-16">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600">
              {intl.formatMessage({ defaultMessage: 'Home' })}
            </a>
          </Link>

          <a href="/rss.xml" className="text-gray-500 hover:text-gray-600">
            RSS
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <OutboundLink
            className="text-gray-500 hover:text-gray-600"
            href={SEO.socials.twitter}
          >
            Twitter
          </OutboundLink>
          <OutboundLink
            className="text-gray-500 hover:text-gray-600"
            href={SEO.socials.github}
          >
            GitHub
          </OutboundLink>
        </div>
      </div>
    </footer>
  )
}

export default Footer
