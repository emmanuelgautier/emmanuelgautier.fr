import { getLocale } from '@lib/get-localized-domain'
import getConfig from 'next/config'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import OutboundLink from './OutboundLink'

const Footer: React.FC = () => {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: {
        socials: { twitter, github },
      },
    },
  } = getConfig()

  return (
    <footer className="flex flex-col justify-center items-start mx-auto w-full p-8 mb-4">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-3 gap-2 pb-16">
        <div className="flex flex-col space-y-4">
          <Link className="text-gray-500 hover:text-gray-600" href="/">
            {intl.formatMessage({ defaultMessage: 'Home' })}
          </Link>

          <Link className="text-gray-500 hover:text-gray-600" href="/rss.xml">
            RSS
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <OutboundLink
            className="text-gray-500 hover:text-gray-600"
            href={twitter}
          >
            Twitter
          </OutboundLink>
          <OutboundLink
            className="text-gray-500 hover:text-gray-600"
            href={github}
          >
            GitHub
          </OutboundLink>
        </div>
        <div className="flex flex-col space-y-4">
          {getLocale() === 'en' && (
            <Link className="text-gray-500 hover:text-gray-600" href="/uses">
              Uses
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
