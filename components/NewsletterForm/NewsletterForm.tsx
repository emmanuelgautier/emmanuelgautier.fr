import { useIntl } from 'react-intl'

import { newsletterSubscribe } from '@lib/gtm'

interface Props {}

const NewsletterForm: React.FC<Props> = () => {
  const intl = useIntl()

  const subscribe = () => {
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
            'Get emails from me about web development and a lot of topics related to tech.',
        })}
      </p>
      <form
        className="relative my-4"
        onSubmit={subscribe}
        action="https://newsletter.emmanuelgautier.com/add_subscriber"
        method="post"
        target="_blank"
      >
        <input
          placeholder="john@doe.com"
          type="email"
          autoComplete="email"
          name="member[email]"
          required
          className="px-4 py-2 mt-1 focus:border-sky-500 block w-full rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 pr-32"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 hover:bg-gray-700 dark:bg-gray-900 text-gray-700 hover:text-gray-100 dark:text-gray-100 rounded w-28"
          type="submit"
        >
          {intl.formatMessage({
            id: 'newsletter.form.button',
            defaultMessage: 'Subscribe',
          })}
        </button>
      </form>
    </div>
  )
}

export default NewsletterForm
