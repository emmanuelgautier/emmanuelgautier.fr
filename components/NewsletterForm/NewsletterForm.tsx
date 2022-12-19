import Link from 'next/link'
import { useIntl } from 'react-intl'

import { newsletterSubscribe } from '@lib/gtm'

interface Props { }

const NewsletterForm: React.FC<Props> = () => {
  const intl = useIntl()

  const _handleSubscribe = () => {
    newsletterSubscribe()
  }

  return (
    <div className="border border-gray-100 rounded p-6 my-4 w-full dark:border-gray-700 bg-sky-100 dark:bg-sky-800">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        {intl.formatMessage({
          id: 'newsletter.form.title',
          defaultMessage: 'Subscribe to the newsletter',
        })}
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        {intl.formatMessage({
          id: 'newsletter.form.description',
          defaultMessage:
            'Get the latest news about tech new articles and projects.',
        })}
      </p>
      <div className="w-full text-center mt-4">
        <Link href="http://l.emmanuelgautier.com/newsletter">
        <button
          type="button"
          className="px-6 py-2 bg-gray-900 hover:bg-gray-100 dark:bg-gray-300 text-gray-100 hover:text-gray-900 dark:text-gray-700 rounded"
          onClick={_handleSubscribe}
        >
          {intl.formatMessage({
            id: 'newsletter.form.button',
            defaultMessage: 'Subscribe',
          })}
        </button>
        </Link>
      </div>
    </div>
  )
}

export default NewsletterForm
