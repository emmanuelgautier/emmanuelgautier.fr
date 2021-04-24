import Link from 'next/link'
import { useIntl } from 'react-intl'

interface Props { }

const Header: React.FC<Props> = () => {
  const intl = useIntl()

  return (
    <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
      <div>
        <Link href="/blog">
          <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
        </Link>

        <Link href="/">
          <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
            {intl.formatMessage({ defaultMessage: 'Home' })}
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
