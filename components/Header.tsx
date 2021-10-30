import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useIntl } from 'react-intl'

import ProfileImage from './ProfileImg'

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const Header: React.FC = () => {
  const intl = useIntl()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
      <div>
        <Link href="/">
          <a>
            <ProfileImage
              width={75}
              height={75}
              priority
              title={intl.formatMessage({ defaultMessage: 'Home' })}
              className="p-1 sm:p-4 inline-block"
            />
          </a>
        </Link>

        <Link href="/blog">
          <a className="p-1 sm:p-4 text-gray-800 dark:text-gray-100">Blog</a>
        </Link>

        <Link href="/blog/snippets">
          <a className="p-1 sm:p-4 text-gray-800 dark:text-gray-100">
            Snippets
          </a>
        </Link>
      </div>
      <button
        type="button"
        className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
        onClick={() =>
          setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="h-4 w-4 text-gray-800 dark:text-gray-200"
        >
          {theme === Theme.Dark ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      </button>
    </nav>
  )
}

export default Header
